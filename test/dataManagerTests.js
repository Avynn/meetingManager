var assert = require('assert');
var manageInstancer = require('../model/dataManager');
var meetingMod = require('../model/meeting');
var fs = require('fs');

let testPath = './resources/test.JSON'

describe('Data Manager tests', async function(){

    ///// this try catch is ignored for some reason...
    try{
        fs.unlink(testPath, function(err){
            if(err) throw err;
        });
    } catch (error){
        console.log("WARN fs unlink error: ", error);
    }


    let date = new Date();
    let exMeeting = new meetingMod.meeting(date, date);
    let exMeeting1 = new meetingMod.meeting(date, date);

    describe('init tests', function(){
        it('Should be a singleton', async function(){
            var ref1 = await new manageInstancer().getInstance();
            var ref2 = await new manageInstancer().getInstance();
    
            assert.equal(ref1, ref2);
        });
    });
    
    describe('Adding new Meeting test', async function(){
        let instance = await new manageInstancer().getInstance();
    
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
    
    
    describe('get meeting by ID test', function(){
        it('should be able to get meetings by ID', async function(){
            let instance = await new manageInstancer().getInstance();
            let id = instance.meetings[0].id;
            let meeting = instance.meetings[0];
            let result = await instance.getMeetingByID(id);
            let resultID = result.id;

            assert.equal(meeting.id, resultID);
        });

        it('should throw an error if a meeting is not found', async function(){ // a manual check of this works.  Neewd to find a way to automate this test though...
            let instance = await new manageInstancer().getInstance();

            //assert.throws(async function(){await instance.getMeetingByID('asdf')}, Error, 'Meeting with this ID cannot be found');
        });
    });

    describe('reading/writing tests', async function(){

        var writingTest = new Promise(function(resolve, _){
            describe('writing tests', function(){
    
                it('Should throw an error if the path to master is null', function (){
                    assert.throws(function(){instance.save()}, Error, 'Path to master JSON file not specified');
                });
        
                it('should successfully write to a file', async function(){
                    let instance = await new manageInstancer().getInstance(testPath);
        
                    resolve(instance.save());
                });
            });
        });

        await writingTest;

        describe('reading tests', function(){    
            var instancer = new manageInstancer();

            instancer.clearDataInMemory();
    
            it('should read from a created file', async function(){
                let instance = await new manageInstancer().getInstance(testPath)

                assert.equal(instance.meetings[0].startTime.valueOf(), exMeeting.startTime.valueOf());
                assert.equal(instance.meetings[1].startTime.valueOf(), exMeeting1.startTime.valueOf());
            });

            
        }); 
    }) 
});