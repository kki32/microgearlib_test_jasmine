//must be connect to internet;
//TODO: create environment that every test is treated the same. make sure one test don't affect another

var MicroGear = require('microgear');
var fs = require('fs');

//TODO: depend
var pathToFile = "/Users/tsn/Desktop/microgearlib_test_jasmine/helper/receiver.txt";
var pathToFile2 = "/Users/tsn/Desktop/microgearlib_test_jasmine/helper/receiver2.txt";

var filePath = "/Users/tsn/Desktop/microgearlib_test_jasmine/node_modules/jasmine-node/bin/microgear.cache";

describe('Publish to topic that subscribe afterwards + publish to topic empty string', function () {
    var microgear;
    var topic = "/firstTopic";
    var message = 'Hello subscribers.';
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
        if(connected){
            console.log("con");
            microgear.client.end();
        }
        fs.unlinkSync(pathToFile);
    });

    it('subscriber should receive the messages', function (done) {
        console.log("first");
        topic = "";
        microgear.on('connected', function() {
            connected = true;
            setInterval(function() {
                microgear.publish(topic, message);
                console.log("publish message");
            },1000);

            fs.watchFile(pathToFile, function(curr, prev) {

                fs.readFile(pathToFile, 'utf8', function (err, data) {
                    if (err) {
                        console.log("no file");
                        return console.log(err);
                    }
                    console.log("this is da" + data.toString() + "her");
                    expect(data.toString()).toEqual(message);
                    clearInterval();
                    fs.unwatchFile(pathToFile);
                    done();
                });
            });
        },5000);
        microgear.connect(appid);
    }, 10000);
it('subscriber should receive the message', function (done) {
    console.log("second");
    microgear.on('connected', function() {
        connected = true;
        setInterval(function() {
            microgear.publish(topic, message);
            console.log("publish message");
        },1000);

        fs.watchFile(pathToFile, function(curr, prev) {

            fs.readFile(pathToFile, 'utf8', function (err, data) {
                if (err) {
                    console.log("no file");
                    return console.log(err);
                }
                console.log("this is da" + data.toString() + "her");
                expect(data.toString()).toEqual(message);
                clearInterval();
                fs.unwatchFile(pathToFile);
                done();
            });
        });
    },5000);
    microgear.connect(appid);
}, 10000);
});