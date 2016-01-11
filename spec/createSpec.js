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

describe('Resettoken when have microgear.cache and microgear is offline', function () {
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
    afterEach(function () {
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