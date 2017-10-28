var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var config = {
    apiKey: "AIzaSyA4DNLLCLapo_T4gmxDxSur36kjIdemByU",
    authDomain: "water-contamination.firebaseapp.com",
    databaseURL: "https://water-contamination.firebaseio.com",
    storageBucket: "water-contamination.appspot.com"
  };
firebase.initializeApp(config);
var database = firebase.database();
var crypto = require("crypto");
var i2c = require('i2c');
var address = 0x63;
var wire = new i2c(address, {device: '/dev/i2c-1'});
var fs = require('fs');
var data = require('../api/data');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index');
});

router.get('/push', function(req, res){
	var device = database.ref('device/').push();
	data.getID(function(err, id){
		if(err) return res.json({error: err});
		device.set({
			id: id,
			owner: ""
		});
		return res.json({
			id: id,
			owner: ""
		});
	});
});

router.get('/read', function(req, res){
	wire.write("R", function(e){
		if(e) return res.json({error:e});
		setTimeout(function(){
			wire.read(9, function(err, r){
				if(err) return res.json({err:err});
				var s = "";
				for(var i in r){
					if(i == 0 || r[i] == 0) continue;
					s += String.fromCharCode(r[i]);
				}
				res.json(Number(s));
			});
		}, 900);
	});
});

router.get('/id', function(req, res){
	data.getID(function(err, id){
		if(err) return res.json({error: err});
		return res.json(id);
	});
});

module.exports = router;
