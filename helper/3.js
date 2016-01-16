/**
 * Created by tsn on 1/14/2016 AD.
 */

var util = require("util");
var events = require("events");

function MockSchedule(){
    spyOn(this, "emit").andCallThrough();
    spyOn(this, "on").andCallThrough();

    this.connect = jasmine.createSpy("processJobCompletion");
}

util.inherits(MockSchedule, events.EventEmitter);

module.exports = MockSchedule;