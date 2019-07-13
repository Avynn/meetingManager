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

        This procedure pushes an agenda item onto the stack 
        */

        /*TODO: 
            1.) type check the item 
            2.) throw error if item exceeds meeting time limit
        */

        if(this.items.length == 0){
            item.startTime = new Date(this.startTime.valueOf());
            item.endTime = new Date(this.startTime.valueOf() + item.timeAllotted);
        } else {
            item.startTime = new Date(this.items[this.items.length - 1].endTime.valueOf());
            item.endTime = new Date(item.startTime.valueOf() + item.timeAllotted);
        }

        this.items.push(item);
    }
}   