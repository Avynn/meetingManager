const express = require('express');
const bodyParse = require('body-parser');
const cors = require('cors');
var meetingsRouter = require('./meetingsRouter');

const port = 8080;
const app = express();

/*
NOTE:

Gotta fix these filepath issues.
*/

app.use(bodyParse.json({limit: '50mb', extended: true}));
app.use(bodyParse.urlencoded({limit: '50mb', extended: true}));

app.use(cors());

app.use('/meetings', meetingsRouter);

app.listen(port);