var uniqid = require('uniqid');

exports.Item = class {
    constructor(name, description, timeAllotted, votable, id){
        /*
        (String, String, Number, Boolean)

        This constructor takes in two strings, the first of which represents the 
        name of the agenda item, the second of which is a description of said agenda item.
        The next argument is a number representing the minutes of time allotted to this
        agenda item this is stored internally in millilseconds.  The last argument is 
        a boolean representing whether or not the agenda item is something to be voted upon.
        */

        this.id = id != null ? id : uniqid();
        this.name = name;
        this.description = description;
        this.timeAllotted = timeAllotted * 60000;
        this.votable = votable;
        this.usersAye = [];
        this.usersNay = [];
        this.usersAbstain = [];
        this.startTime = null;
        this.endTime = null;
    }

    static fromJSON(obj){
        let name = obj.hasOwnProperty('name') ? obj.name : null;
        let description = obj.hasOwnProperty('description') ? obj.description : null;
        let timeAllotted = obj.hasOwnProperty('timeAllotted') ? obj.timeAllotted : 0;
        let votable = obj.hasOwnProperty('votable') ? obj.votable : false;
        let id = obj.hasOwnProperty('id') ? obj.id : null; 

        let newItem = new exports.Item(name, description, timeAllotted, votable, id);

        return newItem;
    }

    //AYE, NAY, ABSTAIN enumerations

    static aye(){
        return 0;
    }
    
    static nay(){
        return 1;
    }

    static abstain(){
        return 2;
    }

    //END ENUMERATIONS

    addVote(user, vote){
        /* 
        (user, (ENUM) vote)

        This procedure adds a user reference to the vote tally based upon the enumerated
        input passed in as the vote.  using a helper function it allows the user to change votes
        and prevents users from duplicating their votes.
        */

        if(!this.votable){
            throw new Error('This Item is not votable!');
        }

        if(this.changeVote(user, vote)){
            return;
        }

        if(vote == 0){
            this.usersAye.unshift(user);
        } else if(vote == 1){
            this.usersNay.unshift(user);
        } else if(vote == 2){
            this.usersAbstain.unshift(user);
        } else {
            throw new Error('Vote parameter is not part of the enumeration!');
        }
    }

    changeVote(user, newVote){
        /*
        (user, (ENUM) newVote)->Boolean

        This function adds the ability to change a vote and makes sure votes aren't
        duplicated.  This is done by checking the arrays for a duplicate of the 
        user in question.  If the user has voted before then the function splices
        them out of the array and adds their vote to the new array in question
        by recursively calling the parent function.
        */

        var index = 0;

        if(this.checkForDuplicate(user, this.usersAye)){
            index = this.usersAye.indexOf(user);
            this.usersAye.splice(index, 1);
            this.addVote(user, newVote);
            return true;
        }

        if(this.checkForDuplicate(user, this.usersNay)){
            index = this.usersNay.indexOf(user);
            this.usersNay.splice(index, 1);
            this.addVote(user, newVote);
            return true;
        }

        if(this.checkForDuplicate(user, this.usersAbstain)){
            index = this.usersAbstain.indexOf(user);
            this.usersAbstain.splice(index, 1);
            this.addVote(user, newVote);
            return true;
        }

        return false;
    }

    checkForDuplicate(user, list){
        /*
        (user, Array)->Boolean

        This function uses the for each callback function to check for 
        a duplicate user in an array passed in as the second parameter.
        */

        var foundDuplicate = false;

        list.forEach(element => {
            if(element === user){
                foundDuplicate = true;
            }
        });
        
        return foundDuplicate;
    }
}