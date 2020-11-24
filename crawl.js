const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
const path = require("./database/mongodb.path")
var urlModel = require("./database/model/url")
var productModel = require("./database/model/product")
var visible = {visible: true, timeout: 10000}
var detectTimeout = {visible: true, timeout: 1000}
var waitUntilPage = {waitUntil:"networkidle0", timeout: 20000}

var db = mongoose.connection;

mongoose.connect(path, {useNewUrlParser: true, useUnifiedTopology: true});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',()=>console);

async function getText(page, xpath) {
    var [element] = await page.$x(xpath);
    return await page.evaluate(el => el.textContent, element)
}

async function getHtml(page, xpath) {
    var [element] = await page.$x(xpath);
    return await page.evaluate(el => el.innerHTML, element)
}

async function getUrl(page, path, index){
    var regexPath = new RegExp("^https?://"+path.split("://")[1].split("/")[0])
    var index = index||1
    await page.goto(path, waitUntilPage)
    try{
        await page.waitForXPath("//div[contains(@class, 'topview')]/h1", detectTimeout)
        await page.waitForXPath("//div[contains(@class, 'product-options-bottom')]/div/div[contains(@class, 'price-box')]/span/span[contains(@class, 'price')][1]", detectTimeout)
        var code = await getText(page, "//div[contains(@class, 'topview')]/h1/span")||""
        var data = {
            "url"               : await page.url()||"",
            "name"              : (await getText(page, "//div[contains(@class, 'topview')]/h1")).split(code).join("")||"",
            "code"              : code||"",
            "price"             : Number((await getText(page, "//div[contains(@class, 'product-options-bottom')]/div/div[contains(@class, 'price-box')]/span/span[contains(@class, 'price')][1]")).split(/\ |\₫|\./).join(""))||"",
            "images"            : (await page.$$eval(".lt-product-more-image.item.swiper-slide img", options => options.map(option => option.getAttribute("src")||option.getAttribute("data-src"))))||[],
            "description"       : await getHtml(page, "//div[(@class = 'blog-content')]")||"",
            "rate"              : Number(await getText(page, "//p[contains(@class, 'averageRatings')]"))||0,
            "color"             : (await page.$$eval("#configurable_swatch_color li a", options => options.map(option => option.getAttribute("title"))))||[],
            "specifications"    : await getHtml(page, "//table[contains(@id, 'tskt')]")||"",
            "saleOf"            : (await page.$$eval(".khuyenmai-info div div.pack-detail ul li a", options => options.map(option => option.textContent)))||[],
        }
        console.log(data);
        try{
            var s = await new productModel(data).save()
        }catch(e){
            console.log(e);
            console.log("loi insert");
        }
        console.log(s);
        console.log("save done");
    }catch(e){
        console.log("Trang này không có dữ liệu để lấy!");
    }
    var url = await page.evaluate(()=>{
        var allTags = document.getElementsByTagName("a")
        var allUrl = []
        for (var i = 0; i < allTags.length; i++) {
            if(allUrl.indexOf(allTags[i].getAttribute("href"))===-1&&/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(allTags[i].getAttribute("href"))){
                allUrl.push(allTags[i].getAttribute("href"))
            }else{
                console.log(allTags[i].getAttribute("href"));
            }
        }
        return allUrl
    })
    console.log(index, "index");        
    for (var i = 0; i < url.length; i++) {
        try{
            if(regexPath.test(url[i])&&!(new RegExp("/so-sanh/").test(url[i]))){// điều kiện đầu là để tránh việc đi nhầm domain, điều kiệu 2 là né những trang so sánh
                var countD = await urlModel.countDocuments()
                await new urlModel({ url: url[i], index : countD+1||1}).save()
            }
        }catch(e){
            // console.log("ERROR", e);
        }
    }
    var count = await urlModel.countDocuments()
    console.log("COUNT", count);
    var nextUrl = await urlModel.findOne({index : index})
    try{
        console.log("trang số %d với URL: %s", index, nextUrl.url);
    }catch(e){
        console.log(e);
    }
    if(nextUrl)
        await getUrl(page, nextUrl.url, index+1)
    else
        return
}

async function main(){
    var path = "https://cellphones.com.vn/"
    try{
        var browser = await puppeteer.launch({ 
            headless: false,
            executablePath: "/Applications/Google\ Chrome.app/Contents/MacOS/Google Chrome", //-> MacOS
            // executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", //-> WINDOW
            defaultViewport: null
        })
        const page = (await browser.pages())[0]
        const context = browser.defaultBrowserContext();
        context.overridePermissions(path, ["geolocation", "notifications"]);
        await page.goto(path, waitUntilPage)
        await urlModel.deleteMany()// remove all db URL 
        await getUrl(page, path, 0)// find all router GET with path 
        console.log("done");
    }catch(e){
        console.log(e);
    }
}

main()