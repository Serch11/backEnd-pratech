const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Router = require('./router/router');
const session = require('express-session');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


app.use("/", Router);


//exportamos el modulo de app
module.exports = app;