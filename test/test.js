var assert = require('assert');
var userMod = require('../user');
var meetingMod = require('../meeting');

describe('Sample test', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal([1,2,3].indexOf(4), -1);
        });
    });
});

describe('User tests', function(){
    
    //Tests for initializing new users in memory
    
    describe('Init tests', function(){

        describe('#user.name', function (){

            it('Should return the name set by the constructor', function () {
                var usr = new userMod.user('Avynn');

                assert.equal(usr.name, 'Avynn');
            });
            
        });

    })
});

describe('Meeting tests', function(){
    
    //tests for initializing meetings in memory

    describe('Init tests', function(){
        let date = Date.now();
        let meeting = new meetingMod.meeting(date, date);

        it('should return the start time/end time set by the constructor', function (){
            assert.equal(meeting.startTime, date);
            assert.equal(meeting.endTime, date);
        })
    });

    describe('Add user tests', function(){
        let date = Date.now();
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

describe('')