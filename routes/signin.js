var express = require('express');
var router = express.Router();
var axios = require('axios');
var info = require("./modules/infomationCompany.js")
var cdn = require("../../offertracking/routes/modules/CDN.js")
var passport = require('passport');

/* GET users listing. */
router.post('/', passport.authenticate('local', { failureRedirect: '/signin?type=error', successRedirect: "/user/view?type=dashboard"}),
	function(req, res) {
	if(req.user){	
		if(req.user.veryfile){
			res.redirect("/user/view?type=dashboard")
		}else{
			res.send("Bỏ ra bạn ơi😂😂😂")
		}
	}else{
		res.send("Bỏ ra bạn ơi😂😂😂")
	}
})
router.get('/', async (req, res, next) =>{
	if(req.query.type==="resignin"){
  		res.render('signin', { info: info, cdn: cdn, error: `<p class="text-danger text-left text-12 ml-3 mb-1">Incorrect account , the account is not registered or  unauthenticated account information!</p>`});
	}else{
  		res.render('signin', { info: info, cdn: cdn, error: ""});
	}
});
module.exports = router;