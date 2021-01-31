const mongoose = require('mongoose');
const PORT = 5001;
const session = require('express-session');

const connectMongo = require('connect-mongo')(session);

const URL_DB = "mongodb://localhost:27017/pratech";

const app = require('./app');



mongoose.connect(URL_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(() => {
        console.log("Conexio exitosa con la base de datos")
    })
    .catch((err) => {
        console.log(err)
    })

app.use(session({
    secret: 'ESTO ES SECRETO',
    revase: true,
    saveUninitialized: true, //guarda en la base de datos el objecto vacio,
    store: new connectMongo({
        url: URL_DB,
        autoReconnect: true
    })
}));


// app.use("/", (req, res) => {
//     console.log(req.session)
//     req.session.cuenta = req.session.cuenta ? req.session.cuenta + 1 : 1;
//     res.status(200).send(`catidad de sessiones ${req.session.cuenta}`)
// });

app.listen(PORT, () => {
    console.log("Servidor corriendo localhost  " + PORT)
});

