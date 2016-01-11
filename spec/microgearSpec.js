//must be connect to internet;
//TODO: create environment that every test is treated the same. make sure one test don't affect another

var MicroGear = require('microgear');
var fs = require('fs');
//TODO: depend
var pathToFile = "/Users/tsn/Desktop/microgearlib_test_jasmine/helper/receiver.txt";
var pathToFile2 = "/Users/tsn/Desktop/microgearlib_test_jasmine/helper/receiver2.txt";

var filePath = "/Users/tsn/Desktop/hello_world/node_modules/jasmine-node/bin/microgear.cache" ;

//TODO: add create for alias
//xdescribe('Create microgear with different parameters', function () {
//    var microgear;
//    var appkey;
//    var appsecret;
//
//    beforeEach(function () {
//        microgear = undefined;
//       appkey     = 'NLc1b8a3UZPMhOY';
//        appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
//        expect(microgear).toBeUndefined();
//    });
//
//    it('should save gearkey', function () {
//        microgear = MicroGear.create({
//            key : appkey,
//            secret : appsecret
//        });
//        expect(typeof microgear).toBe('object');
//        expect(microgear.gearkey).toEqual(appkey);
//    });
//
//    it('should save appsecret', function () {
//        expect(typeof microgear).not.toBe('object');
//        microgear = MicroGear.create({
//            key : appkey,
//            secret : appsecret
//        });
//        expect(typeof microgear).toBe('object');
//        expect(microgear.gearsecret).toEqual(appsecret);
//    });
//
//    it('should ignore empty gearkey', function () {
//        appkey = '';
//        microgear = MicroGear.create({
//            key : appkey,
//            secret : appsecret
//        });
//        expect(microgear).toBeNull();
//    });
//
//    it('should save the info only the lastest one when create microgear twice', function () {
//        microgear = MicroGear.create({
//            key : appkey,
//            secret : appsecret
//        });
//        expect(microgear.gearkey).toEqual(appkey);
//        expect(microgear.gearsecret).toEqual(appsecret);
//
//        var appkey2 = 'Ziyur6AwgArePdZ';
//        var appsecret2 = 'oiQ0uNGOee2G8MtuMfPu61eW6SYBQI';
//        microgear = MicroGear.create({
//            key : appkey2,
//            secret : appsecret2
//        });
//        expect(typeof microgear).toBe('object');
//        expect(microgear.gearkey).not.toEqual(appkey);
//        expect(microgear.gearsecret).not.toEqual(appsecret);
//        expect(microgear.gearkey).toEqual(appkey2);
//        expect(microgear.gearsecret).toEqual(appsecret2);
//    });
//
//    it('should ignore empty gearsecret', function () {
//        appsecret = '';
//        microgear = MicroGear.create({
//            key : appkey,
//            secret : appsecret
//        });
//        expect(microgear).toBeNull();
//    });
//
//});
//
//xdescribe('Connect successfully, valid input', function () {
//    var microgear;
//    var connected = false;
//    var appkey    = 'NLc1b8a3UZPMhOY';
//    var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
//    var appid = 'testNodeJs';
//
//    beforeEach(function () {
//        microgear = MicroGear.create({
//            key : appkey,
//            secret : appsecret});
//    });
//    afterEach(function (){
//        microgear.client.end();
//    });
//
//    it('should be able to connect without any errors', function (done) {
//        microgear.on('connected', function() {
//            connected = true;
//            expect(connected).toBeTruthy();
//            done();
//        });
//        microgear.connect(appid);
//    }, 10000);
//
//});

//TODO: does not throw error. need to ask.
xdescribe('Connect unsuccessfully due to invalid input', function () {
    var microgear;
    var appkey;
    var appsecret;
    var appid;
    var connected;

    beforeEach(function () {
        appkey = 'NLc1b8a3UZPMhOY';
        appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
        appid = 'testNodeJs';
        connected = false;
    });

    it('should throw error when appkey change its case', function (done) {
        var loweredAppkey = appkey.toLowerCase();
        expect(loweredAppkey).toEqual('nlc1b8a3uzpmhoy');

        microgear = MicroGear.create({
            key : loweredAppkey,
            secret : appsecret
        });
        expect(microgear.loweredAppkey).toEqual(loweredAppkey);
        expect(microgear.appsecret).toEqual(appsecret)

        try{
            microgear.connect(appid, done);
        }
        catch(err){
            console.log(err + "   hello");
            expect(err.toString()).toEqual("Error: request token is not issued, please check your key and secret.");
        }
    });

    it('should throw error when appkey is trimmed', function (done) {
        var trimmedGearKey = appkey.substring(0, appkey.length - 2);

        microgear = MicroGear.create({
            key: trimmedGearKey,
            secret: appsecret
        });

        try{
            microgear.connect(appid, done);
        }
        catch(err){
            console.log(err + "   hello");
            expect(err.toString()).toEqual("Error: request token is not issued, please check your key and secret.");
        }
    });

    it('should throw error when appkey is added', function (done) {
        var addedGearKey = appkey + "xx";

        microgear = MicroGear.create({
            key: addedGearKey,
            secret: appsecret
        });

        try{
            microgear.connect(appid, done);
        }
        catch(err){
            console.log(err + "   hello");
            expect(err.toString()).toEqual("Error: request token is not issued, please check your key and secret.");
        }
    });

    it('should throw error when uses another appkey', function (done) {
        var anotherGearKey = "9O0xiA2lHXz01iE";

        microgear = MicroGear.create({
            key: anotherGearKey,
            secret: appsecret
        });

        try{
            microgear.connect(appid, done);
        }
        catch(err){
            console.log(err + "   hello");
        }
    });

    it('should throw error when appsecret is trimmed', function (done) {
        var trimmedGearSecret = appsecret.substring(0, appsecret.length - 2);

        microgear = MicroGear.create({
            key: appkey,
            secret: trimmedGearSecret
        });

        try{
            microgear.connect(appid, done);
        }
        catch(err){
            console.log(err + "   hello");
            expect(err.toString()).toEqual("Error: request token is not issued, please check your key and secret.");
        }
    });

    it('should throw error when appsecret is added', function (done) {
        var addedGearSecret = appsecret + "xx";

        microgear = MicroGear.create({
            key: addedGearSecret,
            secret: appsecret
        });

        try{
            microgear.connect(appid, done);
        }
        catch(err){
            console.log(err + "   hello");
            expect(err.toString()).toEqual("Error: request token is not issued, please check your key and secret.");
        }
    });

    it('should throw error when appsecret change its case', function (done) {
        var loweredGearSecret = appsecret.toLowerCase();
        microgear = MicroGear.create({
            key : appkey,
            secret : loweredGearSecret
        });

        try{
            microgear.connect(appid, done);
        }
        catch(err){
            console.log(err + "   hello");
            expect(err.toString()).toEqual("Error: request token is not issued, please check your key and secret.");
        }
    });

    it('should throw error when uses another appsecret', function (done) {
        var anotherGearSecret = "VqHTfrj8QlI3ydc1nWQCDK0amtt9aV";

        microgear = MicroGear.create({
            key: appkey,
            secret: anotherGearSecret
        });

        try{
            microgear.connect(appid, done);
        }
        catch(err){
            console.log(err + "   hello");
        }
    });

    it('should throw error when appid change its case', function (done) {
        var loweredAppid = appid.toLowerCase();
        microgear = MicroGear.create({
            key : appkey,
            secret : appsecret
        });

        try{
            microgear.connect(loweredAppid, done);
        }
        catch(err){
            console.log(err + "   hello");
            //TODO: not sure what message
        }
    });

    it('should throw error when appid is trimmed', function (done) {
        var trimmedAppId = appid.substring(0, appid.length - 2);

        microgear = MicroGear.create({
            key: appkey,
            secret: appsecret
        });

        try{
            microgear.connect(trimmedAppId, done);
        }
        catch(err){
            console.log(err + "   hello");
            expect(err.toString()).toEqual("Error: request token is not issued, please check your key and secret.");
        }
    });

    it('should throw error when appid is added', function (done) {
        var addedAppId = appid + "xx";

        microgear = MicroGear.create({
            key: appkey,
            secret: appsecret
        });

        try{
            microgear.connect(addedAppId, done);
        }
        catch(err){
            console.log(err + "   hello");
            expect(err.toString()).toEqual("Error: request token is not issued, please check your key and secret.");
        }
    });

    it('should throw error when uses another appsecret', function (done) {
        var anotherAppId = "testNodeJsHelper";

        microgear = MicroGear.create({
            key: appkey,
            secret: appsecret
        });

        try{
            microgear.connect(anotherAppId, done);
        }
        catch(err){
            console.log(err + "   hello");
        }
    });

});
xdescribe('Connect when no internet', function () {
    var microgear;
    var appkey;
    var appsecret;

    beforeEach(function () {
        microgear = undefined;
        appkey     = 'NLc1b8a3UZPMhOY';
        appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
        expect(microgear).toBeUndefined();
    });

    it('should save gearkey', function () {
        microgear = MicroGear.create({
            key : appkey,
            secret : appsecret
        });
        expect(typeof microgear).toBe('object');
        expect(microgear.gearkey).toEqual(appkey);
    });

    it('should save appsecret', function () {
        expect(typeof microgear).not.toBe('object');
        microgear = MicroGear.create({
            key : appkey,
            secret : appsecret
        });
        expect(typeof microgear).toBe('object');
        expect(microgear.gearsecret).toEqual(appsecret);
    });

    it('should ignore empty gearkey', function () {
        appkey = '';
        microgear = MicroGear.create({
            key : appkey,
            secret : appsecret
        });
        expect(microgear).toBeNull();
    });

    it('should save the info only the lastest one when create microgear twice', function () {
        microgear = MicroGear.create({
            key : appkey,
            secret : appsecret
        });
        expect(microgear.gearkey).toEqual(appkey);
        expect(microgear.gearsecret).toEqual(appsecret);

        var appkey2 = 'Ziyur6AwgArePdZ';
        var appsecret2 = 'oiQ0uNGOee2G8MtuMfPu61eW6SYBQI';
        microgear = MicroGear.create({
            key : appkey2,
            secret : appsecret2
        });
        expect(typeof microgear).toBe('object');
        expect(microgear.gearkey).not.toEqual(appkey);
        expect(microgear.gearsecret).not.toEqual(appsecret);
        expect(microgear.gearkey).toEqual(appkey2);
        expect(microgear.gearsecret).toEqual(appsecret2);
    });

    it('should ignore empty gearsecret', function () {
        appsecret = '';
        microgear = MicroGear.create({
            key : appkey,
            secret : appsecret
        });
        expect(microgear).toBeNull();
    });

});

//TODO
describe('setalias', function () {
    var microgear;
    var message;
    var message2;
    var connected = false;
    var appkey = 'NLc1b8a3UZPMhOY';
    var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
    var appid = 'testNodeJs';

    beforeEach(function () {
        message = "Hi oldname";
        message2 = "Hello newname";
        microgear = MicroGear.create({
            key: appkey,
            secret: appsecret
        });
    });

    afterEach(function () {
        microgear.client.end();
    });

    it('should know only the lastest alias when setalias twice', function (done){
        var oldName = "myself-setalias-old";
        var newName = "myself-setalias-new";
        var counter = 0;
        microgear.on("message", function(topic, msg) {
            counter += 1;
            //TODO expect topic
            expect(msg+"").toBe(message);
            if(counter > 1) {
                //TODO expect topic
                expect(msg+"").toBe(message2);
                done();
            }
        });
        microgear.on('connected', function() {
            connected = true;
            microgear.setalias(oldName);
            microgear.setalias(newName);
            while(counter < 1) {
                microgear.chat(newName, message2);
            }
            while(counter > 1){
                microgear.chat(oldName, message);
            }
        },3000);
        microgear.connect(appid);
    }, 10000)
});


//xdescribe('Chat with myself & setalias', function () {
//    var microgear;
//    var appkey;
//    var appsecret;
//    var appid;
//    var connected;
//    var received;
//
//    beforeEach(function () {
//        microgear = undefined;
//        appkey     = 'NLc1b8a3UZPMhOY';
//        appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
//        appid = 'testNodeJs';
//        connected = false;
//        received = false;
//        expect(microgear).toBeUndefined();
//
//        microgear = MicroGear.create({
//            key : appkey,
//            secret : appsecret});
//
//        fs.exists(filePath, function(exists) {
//            if (!exists) {
//                //TODO: really?
//                expect(false).toBe("Pre-requisite: require microgear.cache file");
//            }
//        });
//    });
//
//    afterEach(function (){
//        //should fail if microgear is not connected
//        microgear.client.end();
//    });
//
//    it('should receive message', function (done) {
//        microgear.on("message", function(topic, msg) {
//            received = true;
//            expect(connected).toBeTruthy();
//            expect(received).toBeTruthy();
//            //TODO: gearalias not set yet.
//            //expect(topic).toBe(appid + "/" + "gearname" + "/" + microgear.gearalias);
//            expect(msg+"").toBe("Hello myself.");
//            done();
//        });
//
//        microgear.on('connected', function() {
//            connected = true;
//            microgear.setalias("myself");
//            microgear.chat('myself', 'Hello myself.');
//        },1000);
//
//        microgear.connect(appid);
//
//    }, 10000);
//});

//prerequisite: run its helper first.
// TODO: get dynamic message
xdescribe('(1) Chat with other online microgear in same appid', function () {
    var microgear;
    var appkey;
    var appsecret;
    var appid;
    var connected;
    var received;
    var gearname;
    var helperGearname;
    var message;

    beforeEach(function () {
        microgear = undefined;
        appkey = 'NLc1b8a3UZPMhOY';
        appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
        appid = 'testNodeJs';
        gearname = "myself-2";
        helperGearname = 'chat-helper-1';
        message = 'Hello Helper.';
        connected = false;
        received = false;
        expect(microgear).toBeUndefined();
        microgear = MicroGear.create({
            key: appkey,
            secret: appsecret
        });

        //write empty file
        fs.writeFile(pathToFile, "", function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("create empty file!")
        });
    });

    afterEach(function () {
        microgear.client.end(); //will fail test if microgear did not connect
        fs.unlinkSync(pathToFile); //delete file
    });

    it('the helper should receive the message', function (done) {
        microgear.on('connected', function () {
            connected = true;
            microgear.setalias(gearname);
            microgear.chat(helperGearname, message);

            fs.watchFile(pathToFile, function(curr, prev) {
                fs.readFile(pathToFile, 'utf8', function (err, data) {
                    if (err) {
                        console.log("error: no file");
                        return console.log(err);
                    }
                    console.log("message: (" + data.toString() + ")");
                    expect(data.toString()).toEqual(message);
                    fs.unwatchFile(pathToFile);
                    done();
                });
            });
        });
        microgear.connect(appid);
    }, 10000);
});

//prerequisite: run its helper first. assuming no other gear in that appid chat to it.
// TODO: get dynamic message
// TODO: not sure possible
xdescribe('(2) Chat with other microgear in different appid', function () {
    //if that microgear receive message, write it down. use watchdog. if receiver file change then fail.
    var connected = false;
    var received = false;
    var appkey    = 'NLc1b8a3UZPMhOY';
    var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
    var appid = 'testNodeJs';

    beforeEach(function () {
        microgear = MicroGear.create({
            key: appkey,
            secret: appsecret
        });

        fs.writeFile(pathToFile, "", function(err) {
            if(err) {
                return console.log(err);
            }
        });
    });

    afterEach(function (){
        microgear.client.end();
        fs.unlinkSync(pathToFile);
    });

    it('should not receive the message', function (done) {
        microgear.on("message", function (topic, msg) {
            expect(topic).toEqual("" + "gearname" + "");
            done();
        });
        microgear.on('connected', function() {
            connected = true;
            microgear.setalias("myself-2");
            microgear.chat('helper_2', 'Hello helper.');
        },1000);
        microgear.connect(appid);
    }, 10000);
});

//TODO: necessary ? unfinished
xdescribe('(3) Chat with other offline microgear', function () {
    var connected = false;
    var received = false;
    var appkey    = 'NLc1b8a3UZPMhOY';
    var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
    var appid = 'testNodeJs';

    beforeEach(function () {
        microgear = MicroGear.create({
            key: appkey,
            secret: appsecret
        });

        fs.writeFile(pathToFile, "", function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("create empty file!");
        });
    });

    afterEach(function (){
        microgear.client.end();
        fs.unlinkSync(pathToFile);
    });

    it('should not do anything until', function () {
        microgear.on('connected', function() {
            connected = true;
            microgear.setalias("myself-2");
            microgear.chat('helper_1', 'Hello helper');
            setTimeout(function () {
                fs.readFile(pathToFile, 'utf8', function (err, data) {
                    if (err) {
                        console.log("no file");
                        return console.log(err);
                    }
                    console.log("message: (" + data.toString() + ")");
                    expect(data.toString()).toEqual("Hello helper");
                    done();
                });
            }, 1000);
        },3000);
        microgear.connect(appid);
    }, 10000);
});

//TODO: possible to test?
xdescribe('Chat with other microgear that replaced the disconnected microgear', function () {
    var connected = false;
    var received = false;
    var appkey    = 'NLc1b8a3UZPMhOY';
    var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
    var appid = 'testNodeJs';


    beforeEach(function () {
        microgear = MicroGear.create({
            key: appkey,
            secret: appsecret
        });

        fs.writeFile(pathToFile, "", function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("create empty file!");
        });
    });

    afterEach(function (){
        microgear.client.end();
        fs.unlinkSync(pathToFile);
    });

    it('the helper should receive the message', function () {
        microgear.on('connected', function() {
            connected = true;
            microgear.setalias("myself-2");
            microgear.chat('helper_1', 'Hello helper');
            setTimeout(function () {
                fs.readFile(pathToFile, 'utf8', function (err, data) {
                    if (err) {
                        console.log("no file");
                        return console.log(err);
                    }
                    console.log("message: (" + data.toString() + ")");
                    expect(data.toString()).toEqual("Hello helper");
                    done();
                });
            }, 1000);
        },3000);
        microgear.connect(appid);
    }, 10000);
});

//TODO: hard one
xdescribe('(4) Chat with other microgear that reconnect', function () {
    //let this side chat before then the helper jumps in.
    var connected = false;
    var received = false;
    var appkey    = 'NLc1b8a3UZPMhOY';
    var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
    var appid = 'testNodeJs';


    beforeEach(function () {
        microgear = MicroGear.create({
            key: appkey,
            secret: appsecret
        });

        fs.writeFile(pathToFile, "", function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("create empty file!");
        });
    });

    afterEach(function (){
        microgear.client.end();
        fs.unlinkSync(pathToFile);
    });

    it('the helper should receive the message', function () {
        microgear.on('connected', function() {
            connected = true;
            microgear.setalias("myself-2");
            microgear.chat('helper_1', 'Hello helper');
            setTimeout(function () {
                fs.readFile(pathToFile, 'utf8', function (err, data) {
                    if (err) {
                        console.log("no file");
                        return console.log(err);
                    }
                    console.log("message: (" + data.toString() + ")");
                    expect(data.toString()).toEqual("Hello helper");
                    done();
                });
            }, 1000);
        },3000);
        microgear.connect(appid);
    }, 10000);
});

//TODO: chat with disconnected, chat with error, new microgear

//TODO:
xdescribe('Chat with other microgear that replaced by error microgear', function () {
    var connected = false;
    var received = false;
    var appkey    = 'NLc1b8a3UZPMhOY';
    var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
    var appid = 'testNodeJs';


    beforeEach(function () {
        microgear = MicroGear.create({
            key: appkey,
            secret: appsecret
        });

        fs.writeFile(pathToFile, "", function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("create empty file!");
        });
    });

    afterEach(function (){
        microgear.client.end();
        fs.unlinkSync(pathToFile);
    });

    it('the helper should receive the message', function () {
        microgear.on('connected', function() {
            connected = true;
            microgear.setalias("myself-2");
            microgear.chat('helper_1', 'Hello helper');
            setTimeout(function () {
                fs.readFile(pathToFile, 'utf8', function (err, data) {
                    if (err) {
                        console.log("no file");
                        return console.log(err);
                    }
                    console.log("message: (" + data.toString() + ")");
                    expect(data.toString()).toEqual("Hello helper");
                    done();
                });
            }, 1000);
        },3000);
        microgear.connect(appid);
    }, 10000);
});
//prerequisite: run its helper first
//xdescribe('(5) Chat with other microgear that change name', function () {
//    var gearname;
//    var helpergearname;
//    var connected = false;
//    var received = false;
//    var appkey    = 'NLc1b8a3UZPMhOY';
//    var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
//    var appid = 'testNodeJs';
//    var message = 'Hello Helper';
//
//    beforeEach(function () {
//        gearname = "myself-5";
//        helpergearname = "chat-helper-5-new";
//        microgear = MicroGear.create({
//            key: appkey,
//            secret: appsecret
//        });
//
//        fs.writeFile(pathToFile, "", function(err) {
//            if(err) {
//                return console.log(err);
//            }
//            console.log("create empty file!");
//        });
//    });
//
//    afterEach(function (){
//        microgear.client.end();
//        fs.unlinkSync(pathToFile);
//    });
//
//    it('the helper should receive the message', function (done) {
//        microgear.on('connected', function() {
//            connected = true;
//            microgear.setalias(gearname);
//            fs.watchFile(pathToFile, function(curr, prev) {
//                console.log("watch");
//                fs.readFile(pathToFile, 'utf8', function (err, data) {
//                    if (err) {
//                        console.log("error: no file");
//                        return console.log(err);
//                    }
//                    console.log("message: (" + data.toString() + ")");
//                    clearInterval(intervalId);
//                    expect(data.toString()).toEqual(message);
//                    fs.unwatchFile(pathToFile);
//                    done();
//                });
//            });
//
//            var intervalId = setInterval(function() {
//                console.log("chatting");
//                microgear.chat(helpergearname, message);
//            },1000);
//        },3000);
//        microgear.connect(appid);
//    }, 20000);
//});


xdescribe('Chat with other microgear that shares the same name', function () {
    var connected = false;
    var received = false;
    var appkey    = 'NLc1b8a3UZPMhOY';
    var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
    var appid = 'testNodeJs';


    beforeEach(function () {
        microgear = MicroGear.create({
            key: appkey,
            secret: appsecret
        });

        fs.writeFile(pathToFile, "", function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("create empty file!");
        });
    });

    afterEach(function (){
        microgear.client.end();
        fs.unlinkSync(pathToFile);
    });

    it('the helper should receive the message', function () {
        microgear.on('connected', function() {
            connected = true;
            microgear.setalias("myself-2");
            microgear.chat('helper_1', 'Hello helper');
            setTimeout(function () {
                fs.readFile(pathToFile, 'utf8', function (err, data) {
                    if (err) {
                        console.log("no file");
                        return console.log(err);
                    }
                    console.log("message: (" + data.toString() + ")");
                    expect(data.toString()).toEqual("Hello helper");
                    done();
                });
            }, 1000);
        },3000);
        microgear.connect(appid);
    }, 10000);
});

xdescribe('Chat with other microgear that has resettoken', function () {
    var connected = false;
    var received = false;
    var appkey    = 'NLc1b8a3UZPMhOY';
    var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
    var appid = 'testNodeJs';


    beforeEach(function () {
        microgear = MicroGear.create({
            key: appkey,
            secret: appsecret
        });

        fs.writeFile(pathToFile, "", function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("create empty file!");
        });
    });

    afterEach(function (){
        microgear.client.end();
        fs.unlinkSync(pathToFile);
    });

    it('the helper should receive the message', function () {
        microgear.on('connected', function() {
            connected = true;
            microgear.setalias("myself-2");
            microgear.chat('helper_1', 'Hello helper');
            setTimeout(function () {
                fs.readFile(pathToFile, 'utf8', function (err, data) {
                    if (err) {
                        console.log("no file");
                        return console.log(err);
                    }
                    console.log("message: (" + data.toString() + ")");
                    expect(data.toString()).toEqual("Hello helper");
                    done();
                });
            }, 1000);
        },3000);
        microgear.connect(appid);
    }, 10000);
});





//prerequisite: run its first
xdescribe('Publish to topic that subscribe before', function () {
    var microgear;
    var topic = "/firstTopic";
    var message = 'Hello subscriber(s).';
    var connected = false;
    var appkey = 'NLc1b8a3UZPMhOY';
    var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
    var appid = 'testNodeJs';

    beforeEach(function () {
        microgear = MicroGear.create({
            key: appkey,
            secret: appsecret
        });

        fs.writeFile(pathToFile, "", function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("create empty file!");
        });
    });

    afterEach(function () {
        microgear.client.end();
        fs.unlinkSync(pathToFile);
    });

    it('subscriber should receive the message', function (done) {
        microgear.on('connected', function() {
            connected = true;
            microgear.setalias("myself-pb-1");
            microgear.publish(topic, message);
            setTimeout(function () {
                fs.readFile(pathToFile, 'utf8', function (err, data) {
                    if (err) {
                        console.log("no file");
                        return console.log(err);
                    }
                    console.log("this is da" + data.toString() + "her");
                    expect(data.toString()).toEqual("Hello subscriber(s).");
                    done();
                });
                console.log("i am inside");
            }, 2500);
        },3000);
        microgear.connect(appid);
    }, 10000);
});

//TODO: need to execute bash shell
xdescribe('Publish to topic that subscribe afterwards', function () {
    var microgear;
    var topic = "/firstTopic";
    var message = 'Should not talk to any subscriber(s).';
    var connected = false;
    var appkey = 'NLc1b8a3UZPMhOY';
    var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
    var appid = 'testNodeJs';

    beforeEach(function () {
        microgear = MicroGear.create({
            key: appkey,
            secret: appsecret
        });

        fs.writeFile(pathToFile, "", function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("create empty file!");
        });
    });

    afterEach(function () {
        microgear.client.end();
        fs.unlinkSync(pathToFile);
    });
//TODO: run helper after run this. use dynamic text
    it('subscriber should not receive the message', function (done) {

        microgear.on('connected', function() {
            connected = true;
            microgear.setalias("myself-pb-2");
            microgear.publish(topic, message);
            setTimeout(function () {
                fs.readFile(pathToFile, 'utf8', function (err, data) {
                    if (err) {
                        console.log("no file");
                        return console.log(err);
                    }
                    console.log("this is da" + data.toString() + "her");
                    expect(data.toString()).not.toEqual(topic);
                    done();
                });
                console.log("i am inside");
            }, 2500);
        },3000);
        microgear.connect(appid);
    }, 10000);
});

//TODO: need this? haven't finish
xdescribe('Publish to more than one subscribed topic', function () {
    var microgear;
    var topic = "/firstTopic";
    var topic2 = "/secondTopic";
    var message = 'To subscriber(s) in topic';
    var message2 = 'To subscriber(s) in topic2';
    var connected = false;
    var appkey = 'NLc1b8a3UZPMhOY';
    var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
    var appid = 'testNodeJs';

    beforeEach(function () {
        microgear = MicroGear.create({
            key: appkey,
            secret: appsecret
        });

        fs.writeFile(pathToFile, "", function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("create empty file!");
        });

        fs.writeFile(pathToFile2, "", function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("create empty file 2!");
        });
    });

    afterEach(function () {
        microgear.client.end();
        fs.unlinkSync(pathToFile);
        fs.unlinkSync(pathToFile2);
    });
//TODO: run helper after run this. use dynamic text,
    //depend on helper 1 and 2
    it('subscriber should not receive the message', function (done) {

        microgear.on('connected', function() {
            connected = true;
            microgear.setalias("myself-pb-2");
            microgear.publish(topic, message);
            microgear.publish(topic2, message2);
            setTimeout(function () {
                fs.readFile(pathToFile, 'utf8', function (err, data) {
                    if (err) {
                        console.log("no file");
                        return console.log(err);
                    }
                    console.log("1 (" + data.toString() + ")");
                    expect(data.toString()).toEqual(message);
                });
                fs.readFile(pathToFile2, 'utf8', function (err, data2) {
                    if (err) {
                        console.log("no file");
                        return console.log(err);
                    }
                    console.log("2 (" + data2.toString() + ")");
                    expect(data2.toString()).toEqual(message2);
                });
                console.log("i am inside");
            }, 2500);
            done();
        },3000);
        microgear.connect(appid);
    }, 10000);
});

xdescribe('Publish to topic that unsubscribed the topic(subscribed before)', function () {
    var microgear;
    var topic = "/firstTopic";
    var topic2 = "/secondTopic";
    var message = 'To subscriber(s) in topic';
    var message2 = 'To subscriber(s) in topic2';
    var connected = false;
    var appkey = 'NLc1b8a3UZPMhOY';
    var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
    var appid = 'testNodeJs';

    beforeEach(function () {
        microgear = MicroGear.create({
            key: appkey,
            secret: appsecret
        });

        fs.writeFile(pathToFile, "", function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("create empty file!");
        });

        fs.writeFile(pathToFile2, "", function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("create empty file 2!");
        });
    });

    afterEach(function () {
        microgear.client.end();
        fs.unlinkSync(pathToFile);
        fs.unlinkSync(pathToFile2);
    });
//TODO: run helper after run this. use dynamic text,
    //depend on helper 1 and 2
    it('subscriber should not receive the message', function (done) {

        microgear.on('connected', function() {
            connected = true;
            microgear.setalias("myself-pb-2");
            microgear.publish(topic, message);
            microgear.publish(topic2, message2);
            setTimeout(function () {
                fs.readFile(pathToFile, 'utf8', function (err, data) {
                    if (err) {
                        console.log("no file");
                        return console.log(err);
                    }
                    console.log("1 (" + data.toString() + ")");
                    expect(data.toString()).toEqual(message);
                });
                fs.readFile(pathToFile2, 'utf8', function (err, data2) {
                    if (err) {
                        console.log("no file");
                        return console.log(err);
                    }
                    console.log("2 (" + data2.toString() + ")");
                    expect(data2.toString()).toEqual(message2);
                });
                console.log("i am inside");
            }, 2500);
            done();
        },3000);
        microgear.connect(appid);
    }, 10000);
});

xdescribe('Publish to topic that the publisher subscribed itself', function () {
    var microgear;
    var topic = "/firstTopic";
    var topic2 = "/secondTopic";
    var message = 'To subscriber(s) in topic';
    var message2 = 'To subscriber(s) in topic2';
    var connected = false;
    var appkey = 'NLc1b8a3UZPMhOY';
    var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
    var appid = 'testNodeJs';

    beforeEach(function () {
        microgear = MicroGear.create({
            key: appkey,
            secret: appsecret
        });

        fs.writeFile(pathToFile, "", function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("create empty file!");
        });

        fs.writeFile(pathToFile2, "", function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("create empty file 2!");
        });
    });

    afterEach(function () {
        microgear.client.end();
        fs.unlinkSync(pathToFile);
        fs.unlinkSync(pathToFile2);
    });
//TODO: run helper after run this. use dynamic text,
    //depend on helper 1 and 2
    it('subscriber should not receive the message', function (done) {

        microgear.on('connected', function() {
            connected = true;
            microgear.setalias("myself-pb-2");
            microgear.publish(topic, message);
            microgear.publish(topic2, message2);
            setTimeout(function () {
                fs.readFile(pathToFile, 'utf8', function (err, data) {
                    if (err) {
                        console.log("no file");
                        return console.log(err);
                    }
                    console.log("1 (" + data.toString() + ")");
                    expect(data.toString()).toEqual(message);
                });
                fs.readFile(pathToFile2, 'utf8', function (err, data2) {
                    if (err) {
                        console.log("no file");
                        return console.log(err);
                    }
                    console.log("2 (" + data2.toString() + ")");
                    expect(data2.toString()).toEqual(message2);
                });
                console.log("i am inside");
            }, 2500);
            done();
        },3000);
        microgear.connect(appid);
    }, 10000);
});


//TODO: publisher/subscriber disconnect , last subscriber unsubscribed


xdescribe('Publish the topic that has subscriber which just resettoken', function () {


    var microgear;
    var topic = "/firstTopic";
    var topic2 = "/secondTopic";
    var message = 'To subscriber(s) in topic';
    var message2 = 'To subscriber(s) in topic2';
    var connected = false;
    var appkey = 'NLc1b8a3UZPMhOY';
    var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
    var appid = 'testNodeJs';

    beforeEach(function () {
        microgear = MicroGear.create({
            key: appkey,
            secret: appsecret
        });

        fs.writeFile(pathToFile, "", function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("create empty file!");
        });

        fs.writeFile(pathToFile2, "", function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("create empty file 2!");
        });
    });

    afterEach(function () {
        microgear.client.end();
        fs.unlinkSync(pathToFile);
        fs.unlinkSync(pathToFile2);
    });
//TODO: run helper after run this. use dynamic text,
    //depend on helper 1 and 2
    it('subscriber should not receive the message', function (done) {

        microgear.on('connected', function() {
            connected = true;
            microgear.setalias("myself-pb-2");
            microgear.publish(topic, message);
            microgear.publish(topic2, message2);
            setTimeout(function () {
                fs.readFile(pathToFile, 'utf8', function (err, data) {
                    if (err) {
                        console.log("no file");
                        return console.log(err);
                    }
                    console.log("1 (" + data.toString() + ")");
                    expect(data.toString()).toEqual(message);
                });
                fs.readFile(pathToFile2, 'utf8', function (err, data2) {
                    if (err) {
                        console.log("no file");
                        return console.log(err);
                    }
                    console.log("2 (" + data2.toString() + ")");
                    expect(data2.toString()).toEqual(message2);
                });
                console.log("i am inside");
            }, 2500);
            done();
        },3000);
        microgear.connect(appid);
    }, 10000);
});

xdescribe('Publish the topic that the subscriber reconnect', function () {


    var microgear;
    var topic = "/firstTopic";
    var topic2 = "/secondTopic";
    var message = 'To subscriber(s) in topic';
    var message2 = 'To subscriber(s) in topic2';
    var connected = false;
    var appkey = 'NLc1b8a3UZPMhOY';
    var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
    var appid = 'testNodeJs';

    beforeEach(function () {
        microgear = MicroGear.create({
            key: appkey,
            secret: appsecret
        });

        fs.writeFile(pathToFile, "", function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("create empty file!");
        });

        fs.writeFile(pathToFile2, "", function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("create empty file 2!");
        });
    });

    afterEach(function () {
        microgear.client.end();
        fs.unlinkSync(pathToFile);
        fs.unlinkSync(pathToFile2);
    });
//TODO: run helper after run this. use dynamic text,
    //depend on helper 1 and 2
    it('subscriber should not receive the message', function (done) {

        microgear.on('connected', function() {
            connected = true;
            microgear.setalias("myself-pb-2");
            microgear.publish(topic, message);
            microgear.publish(topic2, message2);
            setTimeout(function () {
                fs.readFile(pathToFile, 'utf8', function (err, data) {
                    if (err) {
                        console.log("no file");
                        return console.log(err);
                    }
                    console.log("1 (" + data.toString() + ")");
                    expect(data.toString()).toEqual(message);
                });
                fs.readFile(pathToFile2, 'utf8', function (err, data2) {
                    if (err) {
                        console.log("no file");
                        return console.log(err);
                    }
                    console.log("2 (" + data2.toString() + ")");
                    expect(data2.toString()).toEqual(message2);
                });
                console.log("i am inside");
            }, 2500);
            done();
        },3000);
        microgear.connect(appid);
    }, 10000);
});

//TODO:
xdescribe('Subscribe one topic', function () {
    var microgear;
    var topic = "/firstTopic";
    var connected = false;
    var appkey = 'NLc1b8a3UZPMhOY';
    var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
    var appid = 'testNodeJs';

    beforeEach(function () {
        microgear = MicroGear.create({
            key: appkey,
            secret: appsecret
        });
    });

    afterEach(function () {
        microgear.client.end();
    });
//TODO: run helper to subscribe before publish. use dynamic text
    it('subscriber should receive the message', function (done) {
        microgear.on("message", function(topic, msg) {
            var expectedMessage = "To subscriber.";
            //TODO: gearalias not set ne
            expect(msg+"").toBe(expectedMessage);
            done();
        });
        microgear.on('connected', function() {
            connected = true;
            microgear.setalias("myself-sb-1");
            //microgear.subscribe(topic);
        },3000);
        microgear.connect(appid);
    }, 10000);
});


describe('resettoken when have microgear.cache and microgear is offline', function () {
    var microgear;
    var appkey = 'NLc1b8a3UZPMhOY';
    var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
    var appid = 'testNodeJs';

    beforeEach(function (done) {
        microgear = MicroGear.create({
            key: appkey,
            secret: appsecret
        });
        microgear.connect(appid, done);
    });
    afterEach(function (done) {
        fs.unlinkSync(filePath);
    });

    it('should clear the cache in resettoken', function (done) {
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                console.log("no file");
                expect("Pre-requisite: should have microgear.cache file").toBeFalsy();
                return console.log(err);
            }
            expect(data.toString()).not.toEqual('{"_":null}');

            microgear.resettoken(function (result) {
                fs.readFile(filePath, 'utf8', function (err, data) {
                    if (err) {
                        console.log("no file");
                        expect("Resettoken should not delete the file").toBeFalsy();
                        return console.log(err);
                    }
                    expect(data.toString()).toEqual('{"_":null}');
                    done();
                });
            });
        });
    }, 10000);
});

//TODO: new to be checked
xdescribe('test event connected', function () {
    var microgear;
    var connected = false;
    var appkey = 'NLc1b8a3UZPMhOY';
    var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
    var appid = 'testNodeJs';
    //
    beforeEach(function (done) {
        microgear = MicroGear.create({
            key: appkey,
            secret: appsecret
        });
        microgear.connect(appid, done);
    });

    it('should execute if connected is spelled correctly', function (done) {
        setTimeout(function () {
            microgear.on('connected', function() {
                expect(true).toBeTruthy();
                done();
            },3000);
        }, 4000);
    }, 10000);

    it('should not execute if connected is misspelled', function (done) {
        setTimeout(function () {
            microgear.on('connect', function() {
                expect("Should not execute because connected is not spelled correctly").toBeFalsy();
            },3000);
        }, 4000);
    }, 10000);
});

//TODO: new, run helper first to show other present
xdescribe('test event present', function () {
    var microgear;
    var appkey = 'NLc1b8a3UZPMhOY';
    var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
    var appid = 'testNodeJs';
    //
    beforeEach(function (done) {
        microgear = MicroGear.create({
            key: appkey,
            secret: appsecret
        });
        microgear.connect(appid, done);
    });

    it('should trigger present event', function (done) {
        setTimeout(function () {
            microgear.on('present', function() {
                expect(true).toBeTruthy();
            },3000);
            done();
        }, 4000);
    }, 10000);

    it('should not trigger the event if misspelled', function (done) {
        setTimeout(function () {
            microgear.on('presented', function() {
                expect("Should not execute because connected is not spelled correctly").toBeFalsy();
            },3000);
            done();
        }, 4000);
    }, 10000);

    it('should not trigger other event', function (done) {
        //TODO: worry about microgear sends message before code on message is executed
        setTimeout(function () {
            microgear.on('connected', function() {
                expect(true).toBeTruthy();
            },3000);
            microgear.on('message', function() {
                expect("should not trigger message event").toBeFalsy();
            },3000);
            microgear.on('absent', function() {
                expect("should not trigger absent event").toBeFalsy();
            },3000);
            microgear.on('closed', function() {
                expect("should not trigger closed event").toBeFalsy();
            },3000);
            microgear.on('info', function() {
                expect("should not trigger info event").toBeFalsy();
            },3000);
            microgear.on('error', function() {
                expect("should not trigger error event").toBeFalsy();
            },3000);
            microgear.on('warning', function() {
                expect("should not trigger warning event").toBeFalsy();
            },3000);
            done();
        }, 4000);
    }, 10000);

});
//TODO: new, run helper first
xdescribe('test event error', function () {
    var microgear;
    var appkey = 'NLc1b8a3UZPMhOY';
    var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
    var appid = 'testNodeJs';
    //
    beforeEach(function (done) {
        microgear = MicroGear.create({
            key: appkey,
            secret: appsecret
        });
        microgear.connect(appid, done);
    });

    it('should trigger error event', function (done) {
        setTimeout(function () {
            microgear.on('error', function() {
                //expect event error to be emitted
            },3000);
            done();
        }, 4000);
    }, 10000);

    it('should not trigger the event if misspelled', function (done) {
        setTimeout(function () {
            microgear.on('errors', function() {
                expect("Should not execute because connected is not spelled correctly").toBeFalsy();
            },3000);
            done();
        }, 4000);
    }, 10000);

    it('should not trigger other event', function (done) {
        //TODO: worry about microgear sends message before code on message is executed
        setTimeout(function () {
            microgear.on('connected', function() {
                expect(true).toBeTruthy();
            },3000);
            microgear.on('message', function() {
                expect("should not trigger message event").toBeFalsy();
            },3000);
            microgear.on('absent', function() {
                expect("should not trigger absent event").toBeFalsy();
            },3000);
            microgear.on('closed', function() {
                expect("should not trigger closed event").toBeFalsy();
            },3000);
            microgear.on('info', function() {
                expect("should not trigger info event").toBeFalsy();
            },3000);
            microgear.on('present', function() {
                expect("should not trigger error event").toBeFalsy();
            },3000);
            microgear.on('warning', function() {
                expect("should not trigger warning event").toBeFalsy();
            },3000);
            done();
        }, 4000);
    }, 10000);

});

//TODO: new, run helper first, random message, need to change contents
xdescribe('subscribe', function () {
    var microgear;
    var received;
    var connected;
    var expectedMessage;
    var subscribed_topic = "/subscribedTopic";
    var never_subscribed_topic = "/neverSubscribedTopic";
    var appkey = 'NLc1b8a3UZPMhOY';
    var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
    var appid = 'testNodeJs';
    //
    beforeEach(function (done) {
        microgear = MicroGear.create({
            key: appkey,
            secret: appsecret
        });
        microgear.connect(appid, done);
        connected = false;
        received = false;
        expectedMessage = "random messages";
    });

    it('should receive message from subscribed topic', function (done) {
        microgear.subscribe(subscribed_topic);
        microgear.on('message', function(topic, msg) {
            received = true;
            expect(received).toBeTruthy();
            //expect(topic).toBe(); // topic to be same
            expect(msg).toBe(expectedMessage);
            done();
        });
        // should connect as well, otherwise test should fail
        microgear.on('connected', function() {
            connected = true;
            expect(connected).toBeTruthy();
        });
    }, 10000);

    it('should not receive message from unsubscibed topic', function (done) {
        setTimeout(function () {
            microgear.on('errors', function() {
                expect("Should not execute because connected is not spelled correctly").toBeFalsy();
            },3000);
            done();
        }, 4000);
    }, 10000);

    it('should not receive message from publisher that disconnect', function (done) {
    }, 10000);

    it('should receive message from publisher that reconnect', function (done) {
    }, 10000);

    it('should not receive message from publisher that resettoken', function (done) {
    }, 10000);

    it('should trigger error when no topic', function (done) {
    }, 10000);

    it('should trigger error when has invalid topic', function (done) {
    }, 10000);

    it('should still receive message from subscribed topic as usual after subscribed twice', function (done) {
    }, 10000);

    it('should receive message after subscribe topic that has been unsubscribed before', function (done) {
    }, 10000);

    it('should not receive message when the other microgear has error', function(done){

    }, 10000);



});

xdescribe('unsubscribe', function () {
    var microgear;
    var received;
    var connected;
    var expectedMessage;
    var subscribed_topic = "/subscribedTopic";
    var never_subscribed_topic = "/neverSubscribedTopic";
    var appkey = 'NLc1b8a3UZPMhOY';
    var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
    var appid = 'testNodeJs';
    //
    beforeEach(function (done) {
        microgear = MicroGear.create({
            key: appkey,
            secret: appsecret
        });
        microgear.connect(appid, done);
        connected = false;
        received = false;
        expectedMessage = "random messages";
    });

    it('should not receive message after unsubscribed the subscribed topic', function (done) {
        microgear.subscribe(subscribed_topic);
        microgear.on('message', function(topic, msg) {
            received = true;
            expect(received).toBeTruthy();
            //expect(topic).toBe(); // topic to be same
            expect(msg).toBe(expectedMessage);
            done();
        });
        // should connect as well, otherwise test should fail
        microgear.on('connected', function() {
            connected = true;
            expect(connected).toBeTruthy();
        });
    }, 10000);

    it('should not receive message after unsubscribed the topic that has not been subscribed before', function (done) {
    }, 10000);

    it('should not receive message after unsubscribe the same subscribed topic twice', function (done) {
    }, 10000);

    it('should trigger error when no topic', function (done) {
    }, 10000);

    it('should trigger error when has invalid topic', function (done) {
    }, 10000);

});
