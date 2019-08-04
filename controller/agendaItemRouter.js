var express = require('express');
var dataInstancer = require('../model/dataManager');
var router = express.Router();

router.use(async function (req, _, next){
    let instance = await new dataInstancer().getInstance('./resources/test.JSON');
    let id = req.meetingID;

    try {
        req.meetingBody = await instance.getMeetingByID(id)
    } catch (err){
        next(err);
    }

    next();
});

router.get('/', function (req, res){
    res.type('json');
    res.send(JSON.stringify(req.meetingBody.items));
})

module.exports = router;