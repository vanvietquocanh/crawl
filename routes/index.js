var express = require('express');
var router = express.Router();
var productModel = require("../database/model/product")
var url = require("../database/model/url")
var cdn = require("../custom_modules/CDN")
var info = require("../custom_modules/info")
var method = require("../custom_modules/method")
var sidebar = require("../custom_modules/sidebar")

/* GET home page. */
router.get('/', async function(req, res, next){
	var defaultData = { 
			info 	  : info,
			cdn 	  : cdn,
			// sidebar   : htmlSidebar("admin", req),s
			sidebar   : "",
			// permission: "admin",
			titleName : "Home Page"
	}
	if(req.query.page){
		method.renderView(productModel, defaultData, res, Number(req.query.page), method.setPrice(method.removePageType(req.query)), "index")
	}else{
		var maxPrice = (await productModel.find().sort({price:-1}).limit(1).exec())[0].price;
		res.redirect(`/?price=0,${maxPrice}&page=1`)
	}
});

module.exports = router;
