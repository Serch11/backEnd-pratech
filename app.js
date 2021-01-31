const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Router = require('./router/router');
const session = require('express-session');
const connectMongo = require('connect-mongo')(session);
const passport = require('passport');
const mongoose = require('mongoose');


const URL_DB = "mongodb://localhost:27017/pratech";
mongoose.connect(URL_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log("Conexio exitosa con la base de datos")
}).catch((err) => {
    console.log(err)
});

app.use(session({
    secret: 'ESTO ES SECRETO',
    revase: true,
    saveUninitialized: true, //guarda en la base de datos el objecto vacio,
    store: new connectMongo({
        url: URL_DB,
        autoReconnect: true
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))




app.use("/", Router);


//exportamos el modulo de app
module.exports = app;