var crypto = require('crypto');
var fs = require('fs');

function getID(done){
	var id = require('./id');
	var s = "/../api/id.js";
	if(id == "0"){
		const nid = crypto.randomBytes(16).toString("hex");
		var b = 'module.exports = "' + nid + '";';
		fs.truncate(__dirname + s, 0, function() {
			fs.writeFile(__dirname + s, b, function (err){
				if(err) return done("Error writing file: " + err);
				console.log('Created new ID: ' + nid);
				return done(null, nid);
			});
		});
	}else return done(null, id);	
}

module.exports = {
	getID: getID
}