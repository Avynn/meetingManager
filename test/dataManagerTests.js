var assert = require('assert');
var manageInstancer = require('../model/dataManager');
var meetingMod = require('../model/meeting');
var fs = require('fs');

let testPath = './resources/test.JSON'

describe('Data Manager tests', async function(){

    fs.unlink(testPath, function(error){if(error) throw error});
    let date = new Date();
    let exMeeting = new meetingMod.meeting(date, date);
    let exMeeting1 = new meetingMod.meeting(date, date);

    describe('init tests', function(){
        it('Should be a singleton', function(){
            var ref1 = new manageInstancer().getInstance();
            var ref2 = new manageInstancer().getInstance();
    
            assert.equal(ref1, ref2);
        });
    });
    
    describe('Adding new Meeting test', function(){
        let instance = new manageInstancer().getInstance();
    
        it('Should be able to add meetings to the data manager', function(){
            exMeeting.save(null, instance);
    
            assert.equal(instance.meetings[0], exMeeting);
        });
    
        it('should be able to handle multiple meetings', function(){
            exMeeting1.save(null, instance);
                
            assert.equal(instance.meetings[0], exMeeting);
            assert.equal(instance.meetings[1], exMeeting1);
        });
    });          


    describe('reading/writing tests', async function(){

        var writingTest = new Promise(function(resolve, reject){
            describe('writing tests', function(){
    
                it('Should throw an error if the path to master is null', function (){
                    assert.throws(function(){instance.save()}, Error, 'Path to master JSON file not specified');
                });
        
                it('should successfully write to a file', function(){
                    let instance = new manageInstancer().getInstance(testPath);
        
                    resolve(instance.save());
                });
            });
        });

        await writingTest;

        describe('reading tests', function(){
            var instance = null;
    
            var instancer = new manageInstancer();
            instancer.clearDataInMemory();
    
            instance = new manageInstancer().getInstance(testPath);
    
            it('should read from a created file', function(){
                assert.equal(instance.meetings[0].startTime.valueOf(), exMeeting.startTime.valueOf());
                assert.equal(instance.meetings[1].startTime.valueOf(), exMeeting1.startTime.valueOf());
            });

            
        }); 
    }) 
});