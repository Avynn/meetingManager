const express = require('express');
const bodyParse = require('body-parser');
var dataInstancer = require('../model/dataManager');
var meetingMod = require('../model/meeting');

const port = 8080;
const app = express();

app.use(bodyParse.json({limit: '50mb', extended: true}));
app.use(bodyParse.urlencoded({limit: '50mb', extended: true}));


app.get('/meetings', async function(req, res){
    let instance = await new dataInstancer().getInstance('../resources/test.JSON');

    res.type('json');
    res.send(JSON.stringify(instance.meetings));
});

app.get('/meetings/:meetingID', async function(req, res, next){
    let instance = await new dataInstancer().getInstance('../resources/test.JSON');
    let id = req.params.meetingID;
    res.type('json');
    
    instance.getMeetingByID(id).then(function(meeting){
        res.send(JSON.stringify(meeting));
    }).catch(next);
});

app.post('/meetings', async function(req, res){
    let instance = await new dataInstancer().getInstance('../resources/test.JSON');

    let postResult = new Promise(function(resolve, _){
        resolve(meetingMod.meeting.fromJSON(req.body).save(null, instance));
    });

    await postResult;

    res.type('json');
    res.send(JSON.stringify(instance.meetings));
});

app.listen(port);