const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
const path = require("./database/mongodb.path")
var urlModel = require("./database/model/url")
var script = require("./custom_modules/script")
var visible = {visible: true, timeout: 10000}
var detectTimeout = {visible: true, timeout: 1000}
var waitUntilPage = {waitUntil:"domcontentloaded", timeout: 20000}

var db = mongoose.connection;

mongoose.connect(path, {useNewUrlParser: true, useUnifiedTopology: true});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',()=>console);

async function getUrl(page, path, index){
    var regexPath = new RegExp("^https?://"+path.split("://")[1].split("/")[0])
    var index = index||1
    await page.goto(path, waitUntilPage)
    await script[path.split("://")[1].split("/")[0]](page)
    var url = await page.evaluate(()=>{
        var allTags = document.getElementsByTagName("a")
        var allUrl = []
        for (var i = 0; i < allTags.length; i++) {
            if(allUrl.indexOf(allTags[i].getAttribute("href"))===-1&&/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(allTags[i].getAttribute("href"))){//ddk1 là phải chưa tồn tại trong arr vừa tạo, đk 2 là phải là 1 url
                allUrl.push(allTags[i].getAttribute("href"))
            }else{
                console.log(allTags[i].getAttribute("href"));
            }
        }
        return allUrl
    })
    // console.log
    console.log(index, "index");        
    for (var i = 0; i < url.length; i++) {
        try{
            if(regexPath.test(url[i])&&!(new RegExp("/so-sanh|watch/").test(url[i]))){// điều kiện đầu là để tránh việc đi nhầm domain, điều kiệu 2 là né những trang so sánh
                var countD = await urlModel.countDocuments()// này để lấy index lớn nhất vd turn đầu lấy đc 300url thì làm ntn để biết cái maxindex là 300 để chạy liên tục 
                await new urlModel({ url: url[i], index : countD+1||1}).save()
            }
        }catch(e){
            // console.log("ERROR", e);
        }
    }
    var count = await urlModel.countDocuments()
    console.log("COUNT", count);
    var nextUrl = await urlModel.findOne({index : index})//lấy cái url tiếp theo để chạy tức là từ 0 xong xuống dưới r gọi lại theo kiểu đệ quy để chạy tiếp link 2-3-4...
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
    // var path = "https://cellphones.com.vn/"
    // var path = "https://hoanghamobile.com/"
    var path = "https://viettelstore.vn/"
    try{
        var browser = await puppeteer.launch({ 
            headless: false,
            // executablePath: "/Applications/Google\ Chrome.app/Contents/MacOS/Google Chrome", //-> MacOS
            // executablePath: "C:\\ProgramData\\Microsoft\\Windows\\Start\ Menu\\Programs\\Google\ Chrome.exe", //-> WINDOW
            defaultViewport: null
        })
        const page = (await browser.pages())[0]
        const context = browser.defaultBrowserContext();
        context.overridePermissions(path, ["geolocation", "notifications"]);
        await page.goto(path, waitUntilPage)
        await urlModel.deleteMany()// remove all db URL =====
        await getUrl(page, path, 0)// find all router GET with path casi biến thứ 3 là index hiện tại
        console.log("done");
    }catch(e){
        console.log(e, "89");
    }
}

main()
