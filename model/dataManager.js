let fs = require('fs');
var meetingModule = require('./meeting');

class dataManger {
    constructor() {
        // this is where data is loaded if it's not in memory

        this.path = null;
        this.meetings = [];
    }

    save(){
        //writes to master JSON file
        if(this.path == null){
            throw new Error('Path to master JSON file not specified');
        }

        fs.writeFile(this.path, JSON.stringify(this.meetings), {flag: 'w+'}, function(err){
            if(err){
                throw err;
            }
        });
    }

    addMeeting(meeting){
        this.meetings.push(meeting);

        if(this.path != null){
            this.save();
        }
    }

    setPath(path){
        this.path = path;

        fs.readFile(path, (err, data)=>{
            if(err){
                throw err;
            }

            this.updateData(data);
        });
    }

    updateData(JSONobject){
        let newMeetings = JSON.parse(JSONobject);
        this.meetings = [];

        newMeetings.forEach(function(element){
            this.meetings.push(meetingModule.meeting.fromJSON(element));
        });
    }
}

class Instancer {
    constructor() {
        if(!Instancer.instance) {
            Instancer.instance = new dataManger();
        }
    }

    clearDataInMemory() {
        Instancer.instance = null;
    }

    getInstance(path){
        if(path != Instancer.instance.path && path != null){
            Instancer.instance.setPath(path);
        }

        return Instancer.instance;
    }

}

module.exports = Instancer;
