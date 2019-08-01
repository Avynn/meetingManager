const express = require('express');
const bodyParse = require('body-parser');
var dataInstancer = require('../model/dataManager');

const port = 8080;
const app = express();

app.use(bodyParse.json({limit: '50mb', extended: true}));
app.use(bodyParse.urlencoded({limit: '50mb', extended: true}));


app.get('/meetings', async(req, res) => {
    let instance = new dataInstancer().getInstance('../resources/test.JSON');
    
    res.send(JSON.stringify(instance.meetings));
});

app.listen(port);