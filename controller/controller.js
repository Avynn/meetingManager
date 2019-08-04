const express = require('express');
const bodyParse = require('body-parser');
var meetingsRouter = require('./meetingsRouter');

const port = 8080;
const app = express();

app.use(bodyParse.json({limit: '50mb', extended: true}));
app.use(bodyParse.urlencoded({limit: '50mb', extended: true}));

app.use('/meetings', meetingsRouter);

app.listen(port);