let fs = require('fs');
var meetingModule = require('./meeting');

class dataManger {
    constructor() {
        this.path = null;
        this.meetings = [];
    }

    save(){
        //writes to master JSON file
        if(this.path == null){
            throw new Error('Path to master JSON file not specified');
        }

        fs.writeFileSync(this.path, JSON.stringify(this.meetings), {flag: 'w+'}, function(err){
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

    async setPath(path){
        this.path = path;

        try{
            this.updateData(fs.readFileSync(path));
        } catch (error){
            if(error.code != "ENOENT"){ //if the file doesn't exist do nothing.
                throw error;
            }
        }
    }

    async updateData(JSONobject){
        let newMeetings = JSON.parse(JSONobject);
        this.meetings = [];
        var meetings = this.meetings;

        newMeetings.forEach(function(element){
            meetings.push(meetingModule.meeting.fromJSON(element));
        });
    }

    async getMeetingByID(id){
        let foundMeeting = this.meetings.find(function(element){
            return element.id == id;
        });

        if(foundMeeting == null){
            throw new Error('Meeting with this ID cannot be found');
        }

        return foundMeeting;
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

    async getInstance(path){
        if(path != Instancer.instance.path && path != null){
            await Instancer.instance.setPath(path);
        }

        return Instancer.instance;
    }

}

module.exports = Instancer;
