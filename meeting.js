exports.meeting = class{
    constructor(startTime, endTime) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.users = [];
        this.items = [];
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
}   