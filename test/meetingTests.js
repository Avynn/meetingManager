var assert = require('assert');
var meetingMod = require('../meeting');
var userMod = require('../user');
var itemMod = require('../agendaItem');

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

    describe('Add item test', function () {
        let date = new Date();
        let meeting = new meetingMod.meeting(date, date);
        let item1 = new itemMod.Item("Item1", "description 1", 3, true);
        let item2 = new itemMod.Item("Item2", "description 2", 3, true);
        let item3 = new itemMod.Item("Item3", "description 3", 15, true);

        it('Should add items to the meeting', function (){
            meeting.addAgendaItem(item1);

            assert.equal(meeting.items[0], item1);
        });

        it('should correctly set the start time of the first item', function (){
            assert.equal(meeting.startTime.valueOf(), item1.startTime.valueOf());
        });

        it('should correctly set the end time of the first item', function(){
            let date2 = new Date(date.valueOf() + 3 * 60000);

            assert.equal(item1.endTime.valueOf(), date2.valueOf());
        });

        it('should be able to push additional items correctly', function (){
            meeting.addAgendaItem(item2);
            meeting.addAgendaItem(item3);

            assert.equal(meeting.items[1], item2);
            assert.equal(meeting.items[2], item3);
        });

        it('should set additional items to correct start/end times', function(){
            let date3 = new Date(item3.startTime.valueOf() + 15 * 60000);

            assert.equal(item1.endTime.valueOf(), item2.startTime.valueOf());
            assert.equal(item2.endTime.valueOf(), item3.startTime.valueOf());
            assert.equal(item3.endTime.valueOf(), date3.valueOf());
        });
    });
});