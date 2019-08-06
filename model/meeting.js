var dataManagerInstancer = require('./dataManager');
var agendaMod = require('./agendaItem');
var uniqid = require('uniqid');

exports.meeting = class{
    constructor(startTime, endTime, id) {
        this.id = id != null ? id : uniqid();
        this.startTime = startTime;
        this.endTime = endTime;
        this.users = [];
        this.items = [];
    }

    static fromJSON(obj){
        let id = obj.hasOwnProperty('id') ? obj.id : null;

        var meeting = new exports.meeting(null, null, id);

        meeting.startTime = obj.hasOwnProperty('startTime') ? new Date(obj.startTime) : new Date();
        meeting.endTime = obj.hasOwnProperty('endTime') ? new Date(obj.endTime) : new Date();
        meeting.users = obj.hasOwnProperty('users') ? obj.users : [];
        obj.hasOwnProperty('items') ? meeting.initAgendaList(obj.items) : meeting.items =  []; //can throw time exceeds limit error

        //need to init array of users here....

        return meeting;
    }

    initAgendaList(objList){
        let thisRef = this;

        objList.forEach(function(item){
            let newItem = agendaMod.Item.fromJSON(item);
            thisRef.addAgendaItem(newItem); //can throw time exceeds limit error
        })
    }

    addUser(user){
        /*
        (User user)

        This procedure pushes a user onto the meeting stack.  This is done using the
        unshift method of javascript arrays.
        */

        this.users.unshift(user);
    }

    addAgendaItem(item){
        /*
        (agendaItem)

        This procedure pushes an agenda item onto the stack, it also sets the start and end times
        of the items to their appropriate settings.  If the end time exceeds the time limit of the meeting
        then the item is not added to the meeting.
        */

        var startTime = null;
        var endTime = null;

        if(this.items.length == 0){
            startTime = new Date(this.startTime.valueOf());
            endTime = new Date(this.startTime.valueOf() + item.timeAllotted);
        } else {
            startTime = new Date(this.items[this.items.length - 1].endTime.valueOf());
            endTime = new Date(startTime.valueOf() + item.timeAllotted);
        }

        if(endTime.valueOf() > this.endTime.valueOf()){
            throw new Error('Agenda item exceeds meeting time limit');
        }

        item.startTime = startTime;
        item.endTime = endTime;

        this.items.push(item);
    }

    moveAgendaItem(item, pos) {
        /*
        (agendaItem, Integer)

        This changes the position of the item as well as adjusting the start and end times 
        of the other items in the agenda.  Position assumes a zero indexed list.  To remove 
        an item pass in -1 as the parameter for pos.
        */

        if(pos > this.items.length || (pos < 0 && pos != -1)){
            throw new Error('item is beyond the bounds of the items list');
        }

        let prevPos = this.items.indexOf(item);

        if(prevPos < 0){
            throw new Error('Item is currently not on the agenda');
        }

        this.items.splice(prevPos, 1);
        if(pos != -1){
            this.items.splice(pos, 0, item);
        }

        for(var i = 0; i < this.items.length; i ++){
            var startTime = null;
            var endTime = null;

            if(i == 0){
                startTime = new Date(this.startTime.valueOf());
                endTime = new Date(this.startTime.valueOf() + this.items[i].timeAllotted);
            } else {
                startTime = new Date(this.items[i - 1].endTime.valueOf());
                endTime = new Date(startTime.valueOf() + this.items[i].timeAllotted);
            }

            this.items[i].startTime = startTime;
            this.items[i].endTime = endTime;

        }
    }

    getAgendaItemByID(ID){
        let foundItem = this.items.find(function(item){
            return ID == item.id;
        })

        if(foundItem == null){
            throw new Error('Item with that ID does not exist');
        }

        return foundItem
    }

    save(path, instance){
        /* 
        (void)

        This procedure adds the meeting to the data manager which will save it to the master JSON file.
        */

        var dataInstance = null;

        if(instance == null){
            dataInstance = new dataManagerInstancer().getInstance(path);
        } else {
            dataInstance = instance;
        }

        dataInstance.addMeeting(this);
    }
}   