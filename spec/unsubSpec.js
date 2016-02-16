//must be connect to internet;
//TODO: create environment that every test is treated the same. make sure one test don't affect another

var MicroGear = require('microgear');

var fs = require('fs');

//TODO: depend
var pathToFile = "/Users/tsn/Desktop/microgearlib_test_jasmine/helper/receiver.txt";
var pathToFile2 = "/Users/tsn/Desktop/microgearlib_test_jasmine/helper/receiver2.txt";

var filePath = "/Users/tsn/Desktop/microgearlib_test_jasmine/node_modules/jasmine-node/bin/microgear.cache";

xdescribe('Subscribe one topic', function () {
    var microgear;
    var topic = "/firstTopic";
    var message = "Hello from helper.";
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
        if(connected){
            microgear.client.end();
        }
    });

    it('should receive message from topic that the helper publish', function (done) {
        microgear.on("message", function(topic, msg) {
            //TODO: gearalias not set ne
            expect(msg+"").toBe(message);
            done();
        });
        microgear.on('connected', function() {
            console.log("iamon");
            connected = true;
            microgear.subscribe(topic);
        },5000);

        microgear.connect(appid);
    }, 10000);
});

xdescribe('Connect successfully, valid input', function () {
    var microgear;
    var appkey;
    var appsecret;
    var appid;
    var connected;

    beforeEach(function () {
        appkey    = 'NLc1b8a3UZPMhOY';
        appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
        appid = 'testNodeJs';
        connected = false;

        microgear = MicroGear.create({
            key : appkey,
            secret : appsecret});
    });
    afterEach(function (){
        //should fail here if microgear is not connect
        microgear.client.end();
    });

    it('should be able to connect without any errors', function (done) {
        microgear.on('connected', function() {
            connected = true;
            expect(connected).toBeTruthy();
            done();
        });
        microgear.connect(appid);
    }, 10000);

});

//prerequisite: helper code 4. need to end helper. publish_helper.js
xdescribe('Unsubscribe the same topic twice starts from unsubscribe', function () {
    var microgear;
    var received;
    var subscribed;
    var count;
    var previousCount;
    var unsubscribedOnce;
    var unsubscribedTwice;
    var topic = "/firstTopic";
    var message = "Hello from helper.";
    var connected = false;
    var appkey = 'NLc1b8a3UZPMhOY';
    var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
    var appid = 'testNodeJs';
    var timerCallback;


    beforeEach(function () {
        unsubscribedOnce = false;
        unsubscribedTwice = false;
        subscribed = false;
        received = false;
        count = 0;
        previousCount = 0;
        microgear = MicroGear.create({
            key: appkey,
            secret: appsecret
        });
    });

    afterEach(function () {
        console.log("in");
        if(connected){
            console.log("cut");
            microgear.client.end();
        }

    });
    it('should not receive message again after unsubscribe twice', function (done) {
        console.log("hello");
        done();
        //microgear.on("message", function(topic, msg) {
        //    received = true;
        //    if(subscribed && unsubscribedOnce && unsubscribedTwice){
        //        expect(msg+"").toBe(message);
        //        done();
        //
        //    }
        //    else{
        //        expect(false).toBeFalsy();
        //    }
        //});
        //microgear.on('connected', function() {
        //    connected = true;
        //    unsubscribedOnce = true;
        //    microgear.unsubscribe(topic);
        //    setTimeout(function () {
        //        console.log("unsubw");
        //        previousCount = count;
        //        microgear.unsubscribe(topic);
        //        unsubscribedTwice = true;
        //    }, 2000);
        //    setTimeout(function () {
        //        console.log("subw");
        //        microgear.subscribe(topic);
        //        subscribed = true;
        //    }, 4000);
        //
        //}, 9000);
        //
        //
        //microgear.connect(appid);
    }, 10000);
});

xdescribe('Unsubscribe the same topic twice starts from subscribe', function () {
    var microgear;
    var received;
    var subscribed;
    var count;
    var previousCount;
    var unsubscribedOnce;
    var unsubscribedTwice;
    var topic = "/firstTopic";
    var message = "Hello from helper.";
    var connected;
    var appkey = 'NLc1b8a3UZPMhOY';
    var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
    var appid = 'testNodeJs';

    microgear = MicroGear.create({
        key: appkey,
        secret: appsecret
    });

    microgear.on('connected', function() {
        console.log("online");
    });

    beforeEach(function () {

        connected = false;
        unsubscribedOnce = false;
        unsubscribedTwice = false;
        subscribed = false;
        received = false;
        count = 0;
        previousCount = 0;


    });

    afterEach(function () {
        console.log("in");
        if(connected){
            console.log("cut");
            microgear.client.end();
        }

    });

    it('should not receive message again after unsubscribe twice', function (done) {
        microgear.on('connected', function () {
            connected = true;
            subscribed = false;
            microgear.subscribe(topic);
            setTimeout(function () {
                console.log("unsub");
                previousCount = count;
                microgear.unsubscribe(topic);
                unsubscribedOnce = true;
            }, 2000);
            setTimeout(function () {
                console.log("unsub");
                microgear.unsubscribe(topic);
                unsubscribedTwice = true;
            }, 4000);

            setTimeout(function () {
                expect(count).toBe(previousCount);
                console.log("wait");
                done();
            }, 6000);
        });

        microgear.on("message", function (topic, msg) {
            console.log("inside");
            received = true;
            if (subscribed && !unsubscribedOnce && !unsubscribedTwice) {
                count += 1;
            }
            //TODO: gearalias not set


        }, 4000);

        microgear.connect(appid);

    }, 10000);
});

