var assert = require('assert');
var meetingMod = require('../meeting');
var userMod = require('../user');

describe('Meeting tests', function(){
    
    //tests for initializing meetings in memory

    describe('Init tests', function(){
        let date = new Date();
        let meeting = new meetingMod.meeting(date, date);

        it('should return the start time/end time set by the constructor', function (){
            assert.equal(meeting.startTime, date);
            assert.equal(meeting.endTime, date);
        })
    });

    describe('Add user test', function(){
        let date = new Date();
        let meeting = new meetingMod.meeting(date, date);
        let usr1 = new userMod.user("Avynn");
        let usr2 = new userMod.user("Sage");
        let usr3 = new userMod.user("Dan");

        it('Should push users onto the meeting\'s user stack', function() {
            meeting.addUser(usr1);
            meeting.addUser(usr2);
            meeting.addUser(usr3);

            assert.equal(meeting.users[0], usr3);
            assert.equal(meeting.users[1], usr2);
            assert.equal(meeting.users[2], usr1);
        });
    });
});