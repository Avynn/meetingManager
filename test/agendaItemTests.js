var assert = require('assert');
var agendaMod = require('../agendaItem');
var userMod = require('../user');

describe('agenda tests', function(){
    
    //tests for initializing meetings in memory

    let agendaName = 'Test name';
    let agendaDescription = 'test description';

    describe('Init tests', function(){
        let item = new agendaMod.Item(agendaName, agendaDescription, 3, false);

        it('should return the correct name from the constructor', function (){
            assert.equal(item.name, agendaName);
        });

        it('should return the correct description from the constructor', function (){
            assert.equal(item.description, agendaDescription);
        });

        it('Should contain the value of 3 minutes in milliseconds', function(){
            assert.equal(item.timeAllotted, 3 * 60000);
        });
    });

    //tests for assuring that voting works correctly

    describe('Voting tests', function(){
        let item = new agendaMod.Item(agendaName, agendaDescription, 3, false);
        let usr1 = new userMod.user("Avynn");
        let usr2 = new userMod.user("Sage");
        let usr3 = new userMod.user("Dan");

        it('should add a user to the Aye Category', function(){
            item.addVote(usr1, agendaMod.Item.aye());
            assert.equal(item.usersAye[0], usr1);
        });

        it('should add a user to the Nay category', function(){
            item.addVote(usr2, agendaMod.Item.nay());
            assert.equal(item.usersNay[0], usr2);
        });

        it('should add a user to the Abstain category', function(){
            item.addVote(usr3, agendaMod.Item.abstain());
            assert.equal(item.usersAbstain[0], usr3);
        });

        it('should move a user from the Aye to the Nay category', function(){
            item.addVote(usr1, agendaMod.Item.nay());
            assert.equal(item.usersNay[0], usr1);
        });

        it('should prevent a duplication of a user in a category', function(){
            item.addVote(usr1, agendaMod.Item.nay());
            assert.equal(item.usersNay[0], usr1);
            assert.equal(item.usersNay.length, 2);         
        })
    });
});