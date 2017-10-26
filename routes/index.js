var express = require('express');
var router = express.Router();
var fs = require('fs');
var key1 = JSON.parse(fs.readFileSync('keys/key1.json', 'utf8'));
var key2 = JSON.parse(fs.readFileSync('keys/key2.json', 'utf8'));
var validator = require('express-validator');
var crypto = require('crypto');

var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return value;
};

/* GET home page. */
router.get('/index', function(req, res, next) {
	
	res.render('index', { title: "Owen's Site", navBarToggle: true});
});

router.get('/', function(req, res, next) {
	
	res.render('index', { title: "Owen's Site", navBarToggle: true});
});

router.get('/contact', function(req, res, next) {
	
	res.render('contact', { title: "Owen's contacts", navBarToggle: true});
});

router.post('/about',function(req, res, next) {
		req.checkBody('password', 'Invalid password').isAlpha();
		
		var errors = req.validationErrors();
		console.log(errors);
		if (errors) {
			res.status(400).send('Invalid Inputs');
		} else {
			//check both password to see if there is a match
			if(sha512(req.body.password, key1.salt) === key1.passwordHash)
				res.render('about', { title: "About Owen", file: "Owen-CV1.pdf", navBarToggle: true});
			
			else if (sha512(req.body.password, key2.salt) === key2.passwordHash){
				res.render('about', { title: "About Owen", file: "Owen-CV2.pdf", navBarToggle: true});
				
			} else {
				res.status(401).send('Invalid Password');
			}
		}
});

module.exports = router;
