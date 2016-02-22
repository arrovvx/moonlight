var express = require('express');
var router = express.Router();
var navListObj = {
	index: "Home", 
	about: "About", 
	contact: "Contact"
}

/* GET home page. */
router.get('/index', function(req, res, next) {
	
	res.render('index', { title: "Owen's Site", navBarToggle: false, navListObj: navListObj});
});

router.get('/', function(req, res, next) {
	
	res.render('index', { title: "Owen's Site", navBarToggle: false, navListObj: navListObj});
});

router.get('/about', function(req, res, next) {
	
	res.render('about', { title: "About Owen", navBarToggle: true, navListObj: navListObj});
});

module.exports = router;
