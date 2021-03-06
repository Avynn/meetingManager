var assert = require('chai').assert;
var meetingMod = require('../model/meeting');
var userMod = require('../model/user');
var itemMod = require('../model/agendaItem');

describe('Meeting tests', function(){
    
    //tests for initializing meetings in memory

    describe('Init tests', function(){
        let date = new Date();
        let meeting = new meetingMod.meeting(date, date);

        it('should return the start time/end time set by the constructor', function (){
            assert.equal(meeting.startTime, date);
            assert.equal(meeting.endTime, date);
        })

        it('should instantiate from an equivalent object', function (){
            let JSONMeeting = meetingMod.meeting.fromJSON(JSON.parse(JSON.stringify(meeting)));

            assert.equal(meeting.startTime.valueOf(), JSONMeeting.startTime.valueOf());
            assert.equal(meeting.endTime.valueOf(), JSONMeeting.endTime.valueOf());
            assert.equal(meeting.users.length, JSONMeeting.users.length);
            assert.equal(meeting.items.length, JSONMeeting.items.length);
            assert.hasAllKeys(JSONMeeting, ['id', 'startTime', 'endTime', 'users', 'items']);
        });

        it('should init from a partial object', function(){
            let JSONMeeting = {
                'startTime' : new Date()
            }

            let placeholder = meetingMod.meeting.fromJSON(JSONMeeting);

            assert.hasAllKeys(placeholder, ['startTime', 'endTime', 'users', 'items', 'id']);
        });

        it('should inherit id from JSON', function(){
            let JSONMeeting = {
                'id' : '1234asdf'
            }

            let placeholder = meetingMod.meeting.fromJSON(JSONMeeting);

            assert.equal(placeholder.id, JSONMeeting.id);
        });

        describe('Initialization with items', function(){

            let start = new Date();
            let end = new Date(start.valueOf() + 3 * 60000);

            let JSONMeeting = {
                'startTime' : start.toString(),
                'endTime' : end.toString(),
                'items' : [
                    {id:'123abc'},
                    {id:'223abc'},
                    {id:'323abc'}
                ]
            };

            let meeting = meetingMod.meeting.fromJSON(JSONMeeting);

            it('should be able to init agendas properly', function(){
                meeting.items.forEach(function(item){
                    assert.hasAllKeys(item, ['id', 'name', 'description', 'timeAllotted', 'votable', 
                    'usersAye', 'usersNay', 'usersAbstain', 'startTime', 'endTime']);
                });
            });

            it('should be maintain agenda item order', function(){
                for(var i  = 0; i < 3; i++){
                    assert.equal(meeting.items[i].id, JSONMeeting.items[i].id);
                }
            })
        })
    });

    //tests for adding users

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

    describe('Query items test', function(){
        it('should be able to query for items by ID', function(){
            let start = new Date();
            let end = new Date(start.valueOf + 3 * 60000);

            let meeting = new meetingMod.meeting(start, end);
            let item = new itemMod.Item("item", "description", 1, true);
            let ID = item.id;

            meeting.addAgendaItem(item);

            let query = meeting.getAgendaItemByID(ID);

            assert.equal(query.id, ID);
        });
    })

    //tests for adding items.

    describe('Add item test', function () {
        let date = new Date();
        let endDate = new Date(date.valueOf() + 21 * 60000);
        let meeting = new meetingMod.meeting(date, endDate);
        let item1 = new itemMod.Item("Item1", "description 1", 3, true);
        let item2 = new itemMod.Item("Item2", "description 2", 3, true);
        let item3 = new itemMod.Item("Item3", "description 3", 15, true);
        let item4 = new itemMod.Item("Item4", "description 4", 15, true);

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
            assert.equal(item1.endTime.valueOf(), item2.startTime.valueOf());
            assert.equal(item2.endTime.valueOf(), item3.startTime.valueOf());
            assert.equal(item3.endTime.valueOf(), endDate.valueOf());
        });

        it('should not allow an item that exceeds the meeting time', function(){
            assert.throws(function () {meeting.addAgendaItem(item4)}, Error, 'Agenda item exceeds meeting time limit');
        });

        it('should move agenda items properly', function(){
            meeting.moveAgendaItem(item3, 0);

            assert.equal(meeting.items[0], item3);
            assert.equal(meeting.items[1], item1);
            assert.equal(meeting.items[2], item2);
        });

        it('should remove an item from the agenda', function(){
            meeting.moveAgendaItem(item3, -1);

            assert.equal(meeting.items[0], item1);
            assert.equal(meeting.items[1], item2);
        })

        it('should throw an error for out of bounds indicies', function(){
            assert.throws(function (){meeting.moveAgendaItem(item3, 40)}, Error, 'item is beyond the bounds of the items list');
            assert.throws(function (){meeting.moveAgendaItem(item3, -4)}, Error, 'item is beyond the bounds of the items list');
        });

        it('should throw an error if the item is not on the agenda', function(){
            assert.throws(function (){meeting.moveAgendaItem(item4, 0)}, Error, 'Item is currently not on the agenda');
        });

        it('Should adjust item times properly after a move', function(){
            meeting.addAgendaItem(item3);
            meeting.moveAgendaItem(item3, 0);

            assert.equal(item3.endTime.valueOf(), item1.startTime.valueOf());
            assert.equal(item1.endTime.valueOf(), item2.startTime.valueOf());
            assert.equal(item2.endTime.valueOf(), endDate.valueOf());
        });
    });
});