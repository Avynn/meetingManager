exports.Item = class {
    constructor(name, description, votable){
        this.name = name;
        this.description = description;
        this.votable = votable;
        this.usersAye = [];
        this.usersNay = [];
        this.usersAbstain = [];
    }

    
}