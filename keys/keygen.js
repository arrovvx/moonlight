var crypto = require('crypto');
var fs = require('fs');

var genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') 	// convert to hexadecimal format
            .slice(0,length);   // return the specified number of characters
};

var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt); //hash with sha512 
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};

function saltHashPassword(userpassword) {
    var salt = genRandomString(16); //salt of length 16 
    var passwordData = sha512(userpassword, salt);
	
	var fs = require('fs');
	fs.writeFile("key.json", JSON.stringify(passwordData)); 
}

//saltHashPassword('friedchicken');