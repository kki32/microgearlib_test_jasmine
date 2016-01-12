#!/usr/bin/env node
var MicroGear = require('microgear');
var microgear;
var gearname = "publish-helper-1";
var appkey    = 'NLc1b8a3UZPMhOY';
var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
var appid = 'testNodeJs'
var fs = require('fs');
var pathToFile = "/Users/tsn/Desktop/microgearlib_test_jasmine/helper/receiver.txt";
var topic = '/firstTopic';
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
	microgear.subscribe(topic);
});

microgear.on('warning', function(err) {
	console.log("warn");
});

microgear.on('info', function(err) {
	console.log("info");
});

microgear.on("message", function(topic,msg) {
	console.log("Incoming message: "+msg);
	if (fs.existsSync(pathToFile)) {
		fs.writeFile(pathToFile, msg, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
    microgear.client.end();
 }); 
}
else{
	console.log("not found");
}

});

 microgear.connect(appid);
