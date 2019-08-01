var dataManagerInstancer = require('./dataManager');

exports.meeting = class{
    constructor(startTime, endTime) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.users = [];
        this.items = [];
    }

    static fromJSON(obj){
        var meeting = new exports.meeting(null, null);

        meeting.startTime = new Date(obj.startTime);
        meeting.endTime = new Date(obj.endTime);
        meeting.users = obj.users;
        meeting.items = obj.items;

        return meeting;
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
        of the other items in the agenda.  Position assumes a zero indexed list
        */

        if(pos > this.items.length || pos < 0){
            throw new Error('item is beyond the bounds of the items list');
        }

        let prevPos = this.items.indexOf(item);

        if(prevPos < 0){
            throw new Error('Item is currently not on the agenda');
        }

        this.items.splice(prevPos, 1);
        this.items.splice(pos, 0, item);

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