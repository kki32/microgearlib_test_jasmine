#!/usr/bin/env node
var MicroGear = require('microgear');

var microgear;
var gearname = "subscribe-helper-1";
var topic = "/firstTopic";
var msg = "To subscriber.";
var appkey    = 'NLc1b8a3UZPMhOY';
var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
var appid = 'testNodeJs'
var fs = require('fs');

var topModule = module;
while(topModule.parent) {
	topModule = topModule.parent;
	console.log(topModule)
}
var appdir = require('path').dirname(topModule.filename);  
console.log(appdir);
microgear = MicroGear.create({
	key : appkey,
	secret : appsecret
});



microgear.on('connected', function() {
	console.log('Connected...');
	microgear.setalias(gearname);
    microgear.publish(topic, msg);
});

microgear.connect(appid);



