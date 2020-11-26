var express = require('express');
var router = express.Router();
var productModel = require("../database/model/product")
var url = require("../database/model/url")
var cdn = require("../custom_modules/CDN")
var info = require("../custom_modules/info")
var method = require("../custom_modules/method")
var sidebar = require("../custom_modules/sidebar")

/* GET home page. */
router.get('/:id', async function(req, res, next){
	var product = await productModel.findOne({_id: req.params.id}).exec();
	var defaultData = { 
			info 	  : info,
			cdn 	  : cdn,
			// sidebar   : htmlSidebar("admin", req),
			sidebar   : "",
			data 	  : product,
			// permission: "admin",
			titleName : `Detail ${product.name}`
	}
  	res.render('details', defaultData);
});

module.exports = router;
