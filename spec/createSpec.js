/**
 * Created by tsn on 1/8/2016 AD.
 */
var MicroGear = require('microgear');

xdescribe('Create microgear with different parameters', function () {
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

xdescribe('Chat with myself', function () {
    var microgear;
    var appkey;
    var appsecret;
    var appid;
    var connected;
    var received;

    beforeEach(function () {
        microgear = undefined;
        appkey     = 'NLc1b8a3UZPMhOY';
        appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
        appid = 'testNodeJs';
        connected = false;
        received = false;
        expect(microgear).toBeUndefined();

        microgear = MicroGear.create({
            key : appkey,
            secret : appsecret});

        fs.exists(filePath, function(exists) {
            if (!exists) {
                //TODO: really?
                expect(false).toBe("Pre-requisite: require microgear.cache file");
            }
        });
    });

    afterEach(function (){
        //should fail if microgear is not connected
        microgear.client.end();
    });

    it('should receive message', function (done) {
        microgear.on("message", function(topic, msg) {
            received = true;
            expect(connected).toBeTruthy();
            expect(received).toBeTruthy();
            //TODO: gearalias not set.
            //expect(topic).toBe(appid + "/" + "gearname" + "/" + microgear.gearalias);
            expect(msg+"").toBe("Hello myself.");
            done();
        });

        microgear.on('connected', function() {
            connected = true;
            microgear.setalias("myself");
            microgear.chat('myself', 'Hello myself.');
        },1000);

        microgear.connect(appid);

    }, 10000);
});

xdescribe('Resettoken when have microgear.cache and microgear is offline', function () {
    var connected;
    var microgear;
    var appkey = 'NLc1b8a3UZPMhOY';
    var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
    var appid = 'testNodeJs';

    beforeEach(function (done) {
        connected = false;
        microgear = MicroGear.create({
            key: appkey,
            secret: appsecret
        });
        microgear.on('connected', function() {
            connected = true;
            expect(connected).toBeTruthy();
            done();
        });
        microgear.connect(appid);
    });
    afterEach(function () {
        if(connected) {
            microgear.client.end();
        }
        fs.unlinkSync(filePath);
    });

    it('should clear the cache in resettoken', function (done) {
        microgear.client.end();
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

xdescribe('Resettoken twice', function () {
    var connected;
    var microgear;
    var appkey = 'NLc1b8a3UZPMhOY';
    var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
    var appid = 'testNodeJs';

    beforeEach(function (done) {
        connected = false;

        microgear = MicroGear.create({
            key: appkey,
            secret: appsecret
        });
        microgear.on('connected', function() {
            connected = true;
            expect(connected).toBeTruthy();
            done();
        });
        microgear.connect(appid);
    });
    afterEach(function () {
        if(connected) {
            microgear.client.end();
        }
        fs.unlinkSync(filePath);
    });

    it('should just resettoken like usual', function (done) {
        if(connected) {
            connected = false;
            microgear.client.end();
        }
        expect(connected).toBeFalsy();

        var data = fs.readFileSync(filePath, 'utf8');
        expect(data.toString()).not.toEqual('{"_":null}');

        microgear.resettoken(function (result) {
            var data2 = fs.readFileSync(filePath, 'utf8');
            expect(data2.toString()).toEqual('{"_":null}');

            microgear.resettoken(function (result2) {
                var data4 = fs.readFileSync(filePath, 'utf8');
                expect(data4.toString()).toEqual('{"_":null}');
                done();
            });
        });

    }, 10000);
});

xdescribe('Resettoken when no cache file', function () {
    var fileExist;
    var microgear;
    var appkey = 'NLc1b8a3UZPMhOY';
    var appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
    var appid = 'testNodeJs';

    beforeEach(function (done) {
        fileExist = false;
        microgear = MicroGear.create({
            key: appkey,
            secret: appsecret
        });

        if(fs.existsSync(filePath)){
            fileExist = true;
            fs.unlinkSync(filePath);
            fileExist = false;
        }
        expect(fileExist).toBeFalsy();
        done();
    });

    it('should do nothing', function (done) {
        microgear.resettoken(function (result) {
            expect(true).toBeTruthy();
            done();
        });
    }, 10000);
});

//prerequisite: need to call helper before/later. publish_helper.js ๅ
xdescribe('Publish to topic that subscribe afterwards + publish to topic empty string', function () {
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

    it('subscriber should receive the message when subscribe after start publishing', function (done) {
        console.log("first");
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
    it('subscriber should receive the message when subscribe empty topic', function (done) {
        console.log("second");
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
});

xdescribe('Publish to topic that the publisher subscribed itself', function () {
    var microgear;
    var appkey;
    var appsecret;
    var appid;
    var connected;
    var received;
    var topic;
    var message;

    beforeEach(function () {
        topic = '/firstTopic';
        message = 'Hello myself.';
        microgear = undefined;
        appkey     = 'NLc1b8a3UZPMhOY';
        appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
        appid = 'testNodeJs';
        connected = false;
        received = false;
        expect(microgear).toBeUndefined();

        microgear = MicroGear.create({
            key : appkey,
            secret : appsecret});
    });

    afterEach(function () {
        if(connected){
            microgear.client.end();
        }
    });

    it('should receive message', function (done) {

        microgear.on('connected', function () {
            connected = true;
            microgear.subscribe(topic);
            setInterval(function() {
                microgear.publish(topic, message);
                console.log("publish message");
            },1000);

        }, 1000);


        microgear.on("message", function (topic, msg) {
            received = true;
            expect(connected).toBeTruthy();
            expect(received).toBeTruthy();
            //TODO: gearalias not set.
            //expect(topic).toBe(appid + "/" + "gearname" + "/" + microgear.gearalias);
            expect(msg + "").toBe(message);
            clearInterval();
            done();
        });


        microgear.connect(appid);
    }, 10000);

});

xdescribe('Publish to topic that subscribe other topic', function () {
    var microgear;
    var appkey;
    var appsecret;
    var appid;
    var connected;
    var received;
    var topic;
    var message;
    var modified;
    beforeEach(function () {
        topic = '/firstTopic';
        message = 'Hello myself.';
        microgear = undefined;
        appkey     = 'NLc1b8a3UZPMhOY';
        appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
        appid = 'testNodeJs';
        connected = false;
        received = false;
        modified = false;
        expect(microgear).toBeUndefined();

        microgear = MicroGear.create({
            key : appkey,
            secret : appsecret});

        fs.writeFile(pathToFile, "", function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("create empty file!");
        });
    });

    afterEach(function () {
        if(connected){
            microgear.client.end();
        }
    });

    it('subscribers should not receive message from topic it does not subscribe', function (done) {
        console.log("first");
        microgear.on('connected', function() {
            connected = true;
            setInterval(function() {
                microgear.publish(topic, message);
                console.log("publish message");
            },1000);


            fs.watchFile(pathToFile, function(curr, prev) {
                modified = true;
                fs.readFile(pathToFile, 'utf8', function (err, data) {
                    if (err) {
                        console.log("no file");
                        return console.log(err);
                    }
                    console.log("this is da" + data.toString() + "her");
                    expect(data.toString()).toEqual(message);
                });
            });

            setTimeout(function () {
                expect(modified).toBeFalsy();
                clearInterval();
                fs.unwatchFile(pathToFile);
                done();
            }, 8000);


        },5000);
        microgear.connect(appid);


    }, 10000);
});

xdescribe('Publish to invalid topic - no slash', function () {
    var count;
    var microgear;
    var appkey;
    var appsecret;
    var appid;
    var connected;
    var received;
    var invalidTopic;
    var message;

    beforeEach(function () {
        count = 0;
        invalidTopic = 'firstTopic';
        message = 'Hello myself.';
        microgear = undefined;
        appkey     = 'NLc1b8a3UZPMhOY';
        appsecret = 'tLzjQQ6FiGUhOX1LTSjtVKsnSExuX7';
        appid = 'testNodeJs';
        connected = false;
        received = false;
        expect(microgear).toBeUndefined();

        microgear = MicroGear.create({
            key : appkey,
            secret : appsecret});
    });

    afterEach(function () {
        if(connected){
            microgear.client.end();
        }
    });

    it('should have some kind of error/warning', function (done) {
        microgear.on('connected', function () {
            count += 1;
            connected = true;
            microgear.publish(invalidTopic, message);
            if(count > 3){
                done();
            }
        }, 1000);
        microgear.connect(appid);
    }, 10000);

});