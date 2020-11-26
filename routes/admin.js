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
	var product = await productModel.find().exec();
	var defaultData = { 
			info 	  : info,
			cdn 	  : cdn,
			// sidebar   : htmlSidebar("admin", req),
			sidebar   : "",
			data 	  : product,
			// permission: "admin",
			titleName : `Admin Page`
	}
  	res.render('admin', defaultData);
});

module.exports = router;
