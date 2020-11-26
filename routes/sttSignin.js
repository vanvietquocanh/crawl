var express = require('express');
var router = express.Router();
var passport = require("passport")
var info = require("./modules/infomationCompany.js")

/* GET users listing. */
router.get('/', function(req, res, next) {
	passport.authenticate('local',{session: true})(req, res, function () {
		if(req.user){
			if(info.adminID(req.user.id)){
				res.redirect("/admin/view?type=dashboard")
			}else{ 
				if(req.user.veryfile){
					res.redirect("/user/view?type=dashboard")
				}else{
					res.send("Cút😂😂😂")
				}
			}
		}else{
			res.send("Cút😂😂😂")
		}
	});
});

module.exports = router;