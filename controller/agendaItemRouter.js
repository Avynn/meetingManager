var express = require('express');
var dataInstancer = require('../model/dataManager');
var itemMod = require('../model/agendaItem');
var router = express.Router();

router.use(async function (req, _, next){
    let instance = await new dataInstancer().getInstance('./resources/test.JSON');
    let id = req.meetingID;

    try {
        req.meetingBody = await instance.getMeetingByID(id)
        req.dataInstance = instance;
    } catch (err){
        next(err);
    }

    next();
});

router.get('/', async function (req, res){
    res.type('json');
    res.send(JSON.stringify(req.meetingBody.items));
});

router.post('/', async function(req, res, next){
    let item = req.body;
    
    try{
        req.meetingBody.addAgendaItem(itemMod.Item.fromJSON(item));
        req.dataInstance.save();
    } catch (error) {
        next(error);
    }

    res.type('json');
    res.send(JSON.stringify(req.meetingBody.items));
});

router.patch('/', async function(req, res, next){
    let patch = req.body.patch;
    let pos = req.body.pos;

    if(pos == null){
        next(new Error('No position indicated in request'));
    }

    if(patch == null || patch.id == null){
        next(new Error('No such item on record'));
    }

    var item = req.meetingBody.getAgendaItemByID(patch.id);
    item.patchItem(patch);

    try{
        req.meetingBody.moveAgendaItem(item, pos);
        req.dataInstance.save();
    } catch (error){
        next(error);
    }

    res.type('json');
    res.send(JSON.stringify(req.meetingBody.items));
});

router.get('/:itemID', async function(req, res, next){
    var responseBody = null;

    try {
        responseBody = req.meetingBody.getAgendaItemByID(req.params.itemID);
    } catch (err){
        next(err);
    }

    res.type('json');
    res.send(JSON.stringify(responseBody));
});

router.patch('/:itemID', async function(req, res, next){
    var queriedItem = null;

    try {
        queriedItem = req.meetingBody.getAgendaItemByID(req.params.itemID);
    } catch (err){
        next(err);
    }

    let user = req.body.user;
    let voteType = req.body.vote;

    try{
        queriedItem.addVote(user, voteType);
        req.dataInstance.save();
    } catch (err){
        next(err);
    }

    res.type('json');
    res.send(JSON.stringify(queriedItem));
})

module.exports = router;