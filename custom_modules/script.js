var visible = {visible: true, timeout: 10000}
var detectTimeout = {visible: true, timeout: 1000}
var waitUntilPage = {waitUntil:"networkidle0", timeout: 20000}
var productModel = require("../database/model/product")

async function getText(page, xpath) {
    var [element] = await page.$x(xpath);
    return await page.evaluate(el => el.textContent, element)
}

async function getHtml(page, xpath) {
    var [element] = await page.$x(xpath);
    return await page.evaluate(el => el.innerHTML, element)
}

module.exports = {
	"cellphones.com.vn" :async (page) => {
		try{
	        await page.waitForXPath("//div[contains(@class, 'topview')]/h1", detectTimeout)// này để kiểm tra xem có tên sp k 	
	        await page.waitForXPath("//div[contains(@class, 'product-options-bottom')]/div/div[contains(@class, 'price-box')]/*/*[contains(@class, 'price')]", detectTimeout)// này củng v nhưng là kiểm tra giá==> nếu 1 trong 2 đứa này k có thì sẽ throw err để biết chỗ này méo p là cái trang chưa sp
	        var code = await getText(page, "//div[contains(@class, 'topview')]/h1/span")||""
	        var data = {
	            "url"               : await page.url()||"",
	            "name"              : (await getText(page, "//div[contains(@class, 'topview')]/h1")).split(code).join("")||"",
	            "code"              : code||"",
	            "price"             : Number((await getText(page, "//div[contains(@class, 'product-options-bottom')]/div/div[contains(@class, 'price-box')]/*/*[contains(@class, 'price')]")).split(/\ |\₫|\./).join(""))||"",
	            "prevPrice"         : Number((await getText(page, "//div[contains(@class, 'product-options-bottom')]/div/div[contains(@class, 'price-box')]/*/*[contains(@id, 'old-price')]")).split(/\ |\₫|\./).join(""))||0,
	            "images"            : (await page.$$eval(".lt-product-more-image.item.swiper-slide img", options => options.map(option => option.getAttribute("src")||option.getAttribute("data-src"))))||[],
	            "description"       : await getHtml(page, "//div[(@class = 'blog-content')]")||"",
	            "rate"              : Number(await getText(page, "//p[contains(@class, 'averageRatings')]"))||0,
	            "color"             : (await page.$$eval("#configurable_swatch_color li a", options => options.map(option => option.getAttribute("title"))))||[],
	            "specifications"    : await getHtml(page, "//table[contains(@id, 'tskt')]")||"",
	            "saleOf"            : (await page.$$eval(".khuyenmai-info div div.pack-detail ul li a", options => options.map(option => option.textContent)))||[],
	        }
	        console.log(data);
	        try{
	            await new productModel(data).save()
	        }catch(e){
	            console.log(e);
	            console.log("loi insert");
	        }
	        console.log("save done");
	    }catch(e){
	        console.log("Trang này không có dữ liệu để lấy!");
	    }
	},
	"hoanghamobile.com" :async (page) => {
		try{
	        await page.waitForXPath("//h1[(@itemprop = 'name')]/strong", detectTimeout)
	        await page.waitForXPath("//div[(@class = 'product-price')]", detectTimeout)
	        var code = ""
	        var data = {
	            "url"               : await page.url()||"",
	            "name"              : (await getText(page, "//h1[(@itemprop = 'name')]/strong")).split(code).join("")||"",
	            "code"              : code||"",
	            "price"             : Number((await getText(page, "//*[(@itemprop = 'price')]")).split(/\ |\₫|\./).join(""))||"",
	            "prevPrice"         : 0,
	            "images"            : (await page.$$eval("#slider1_container div div div div img[u='image']", options => options.map(option => option.getAttribute("src"))))||[],
	            "description"       : await getHtml(page, "//div[(@class = 'product-content')]")||"",
	            "rate"              : 0,
	            "color"             : (await page.$$eval(".list-color ul li a span", options => options.map(option => option.getAttribute("title"))))||[],
	            "specifications"    : await getHtml(page, "//table[contains(@class, 'table tab-prop table-striped table-hover')]")||"",
	            "saleOf"            : (await page.$$eval(".ltsPromote li a", options => options.map(option => option.textContent)))||[],
	        }
	        console.log(data);
	        try{
	            await new productModel(data).save()
	        }catch(e){
	            console.log(e);
	            console.log("loi insert");
	        }
	        console.log("save done");
	    }catch(e){
	        console.log("Trang này không có dữ liệu để lấy!");
	    }
	},
	"viettelstore.vn" : async (page) => {
		try{
	        await page.waitForXPath("//h1[@class = 'txt-24']", detectTimeout)
	        await page.waitForXPath("//*[(@id = '_price_new436')]", detectTimeout)
	        var code = ""
	        var data = {
	            "url"               : await page.url()||"",
	            "name"              : (await getText(page, "//h1[@class = 'txt-24']")).split(code).join("")||"",
	            "code"              : code||"",
	            "price"             : Number((await getText(page, "//*[(@id = '_price_new436')]")).split(/\ |\₫|\./).join(""))||"",
	            "prevPrice"         : Number((await getText(page, "//*[(@id = '_price_new437')]")).split(/\ |\₫|\./).join(""))||0,
	            "images"            : (await page.$$eval("#sync-big div.owl-wrapper-outer div div div img.max-width", options => options.map(option => option.getAttribute("src"))))||[],
	            "description"       : await getHtml(page, "//div[contains(@id, 'gioithieu')]")||"",
	            "rate"              : Number((await page.$$eval(".rating.rating-action input", opts=> opts.map(opt=>{if(opt.checked){return opt.value}}))).join(""))||0,
	            "color"             : (await page.$$eval(".title-color", options => options.map(option => option.textContent)))||[],
	            "specifications"    : await getHtml(page, "//*[contains(@id, 'panel-cau-hinh')]/table")||"",
	            "saleOf"            : (await page.$$eval(".body-promotion", options => options.map(option => option.textContent)))||[],
	        }
	        console.log(data);
	        try{
	            await new productModel(data).save()
	        }catch(e){
	            console.log(e);
	            console.log("loi insert");
	        }
	        console.log("save done");
	    }catch(e){
	    	console.log(e);
	        console.log("Trang này không có dữ liệu để lấy!");
	    }
	}
}