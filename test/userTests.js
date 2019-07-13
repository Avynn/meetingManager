var assert = require('assert');
var userMod = require('../user');

describe('User tests', function(){
    
    //Tests for initializing new users in memory
    
    describe('Init tests', function(){

        describe('#user.name', function (){

            it('Should return the name set by the constructor', function () {
                var usr = new userMod.user('Avynn');

                assert.equal(usr.name, 'Avynn');
            });
            
        });

    })
});