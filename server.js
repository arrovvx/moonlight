/* server.js */
'use strict';
const bodyParser = require('body-parser');
const {body, validationResult} = require('express-validator');
const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const router = express.Router();

// Express
const port = process.env.PORT || 80;
const app = express();
const user = {email: process.env.email, password: process.env.password};

// set up the middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//setting up the email transporter
const transporter = nodemailer.createTransport({
	service: 'gmail', auth: {
			user: user.email,
			pass: user.password
	}
});

/* 
POST /api/email
Request query expects:
{
	"name": <a valid name>
	"email": <a valid email>
	"message": <a valid message string>
}
*/
app.post('/api/email',[
  body('name').exists().not().isEmpty().trim(),
  body('email').exists().isEmail().normalizeEmail(),
  body('message').exists().not().isEmpty().trim().escape()
], function(req, res){
	
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		
		console.log(`Error: /api/email invalid fields. ${JSON.stringify(errors.array())}`);
		return res.status(422).json({ errors: errors.array()});
	}
	
	const name = req.body.name;
	const email = req.body.email;
	const message = req.body.message;
	
	console.log(`${name} from ${email} has message: ${message}`);
	const mailOptions = {
		from: user.email,
		to: user.email,
		subject: `Moonlight Server: You have a message from ${name}`,
		text: message
	};
	
	res.header("Access-Control-Allow-Origin", "https://www.owenyeh.com");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, X-Auth-Token, Accept");
	
	transporter.sendMail(mailOptions, function(err, info){
		if (err) {
			console.log(`Error: Cannot send email. Message: ${err}`);
			res.status(500).send('Sorry, Something Broke! Please Email me directly.');
		} else {
			console.log(`Forwarded to ${user.email}. Status: ${info.response}`);
			res.send("Message Sent!");
		}
	});
})

// GET /ping
app.get('/ping', function(req, res){
	
	res.send({success:true})
})

// handle 404 not found
app.use(function (req, res, next) {
	
	console.error(`Error: Requested route not found`)
	res.status(404).send(`Requested route not found.`);
})

// global error handler
app.use(function (err, req, res, next) {
	
	console.error(`Error: ${err.stack}`);
	res.status(500).send(`Sorry, Something Broke!`);
})

//Start https server on specified port
app.listen(port, function () {
	console.log(`Listening on port ${port}...`);
})
