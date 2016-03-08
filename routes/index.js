var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/index', function(req, res, next) {
	
	res.render('index', { title: "Owen's Site", navBarToggle: true});
});

router.get('/', function(req, res, next) {
	
	res.render('index', { title: "Owen's Site", navBarToggle: true});
});

router.get('/about', function(req, res, next) {
	
	res.render('about', { title: "About Owen", navBarToggle: true});
});

module.exports = router;
