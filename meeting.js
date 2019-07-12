exports.meeting = class{
    constructor(startTime, endTime) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.users = []
    }

    addUser(user){
        /*
        (User user)

        This procedure pushes a user onto the meeting stack.  This is done using the
        unshift method of javascript arrays.
        */

        this.users.unshift(user);
    }
}   