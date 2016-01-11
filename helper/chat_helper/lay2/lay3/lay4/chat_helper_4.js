#!/usr/bin/env node
var MicroGear = require('microgear');
var helpername = "chat-helper-4";
var microgear;
var invalidAppkey    = 'NLc1b8a3UZPMh';
var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
var appid = 'testNodeJs'
var fs = require('fs');
//TODO: path dependent
var pathToFile = "/Users/tsn/Desktop/microgearlib_test_jasmine/spec/receiver.txt";
var topModule = module;
while(topModule.parent) {
	topModule = topModule.parent;
	console.log(topModule)
}
var appdir = require('path').dirname(topModule.filename);  
console.log(appdir);

microgear = MicroGear.create({
	key : invalidAppkey,
	secret : appsecret
});

microgear.on("message", function(topic,msg) {
		if (fs.existsSync(pathToFile)) {
			fs.writeFile(pathToFile, msg, function(err) {
    if(err) {
        return console.log(err);
    }
});
		}
	});


microgear.on('connected', function() {
   setTimeout(function () {
   	microgear.client.end();
   	microgear.connect(appid);
   });
}, 1000);

microgear.connect(appid);
