exports.Item = class {
    constructor(name, description, timeAllotted, votable){
        /*
        (String, String, Number, Boolean)

        This constructor takes in two strings, the first of which represents the 
        name of the agenda item, the second of which is a description of said agenda item.
        The next argument is a number representing the minutes of time allotted to this
        agenda item this is stored internally in millilseconds.  The last argument is 
        a boolean representing whether or not the agenda item is something to be voted upon.
        */


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
        var foundDuplicate = false;

        list.forEach(element => {
            if(element === user){
                foundDuplicate = true;
            }
        });
        
        return foundDuplicate;
    }
}