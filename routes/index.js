var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	
	navListObj = {
		about: "About", 
		blog: "Blog", 
		contact: "Contact"
	}
	res.render('index', { title: "Owen's Site", navBarToggle: false, navListObj: navListObj});
});

module.exports = router;
