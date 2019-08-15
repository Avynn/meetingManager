var express = require('express');
var dataInstancer = require('../model/dataManager');
var meetingMod = require('../model/meeting');
var agendaItemRouter = require('./agendaItemRouter');
var router = express.Router();

router.get('/', async function(req, res){

    //TODO: only serve necessary elements of the meetings

    let instance = await new dataInstancer().getInstance('./resources/test.JSON');

    res.type('json');
    res.send(JSON.stringify(instance.meetings));
});

router.post('/', async function(req, res){
    let instance = await new dataInstancer().getInstance('./resources/test.JSON');
    let newMeeting = meetingMod.meeting.fromJSON(req.body);

    let postResult = new Promise(function(resolve, _){
        resolve(newMeeting.save(null, instance));
    });

    await postResult;

    res.type('json');
    res.send(JSON.stringify(newMeeting));
});

router.get('/:meetingID', async function(req, res, next){
    let instance = await new dataInstancer().getInstance('./resources/test.JSON');
    let id = req.params.meetingID;
    res.type('json');
    
    instance.getMeetingByID(id).then(function(meeting){
        res.send(JSON.stringify(meeting));
    }).catch(next);
});

router.use('/:meetingID/items', function(req, _, next){
    req.meetingID = req.params.meetingID;
    next();
}, agendaItemRouter);

module.exports = router;