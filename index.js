const PORT = 5001;

//importamos app de app.js
const app = require('./app');



app.listen(PORT, () => {
    console.log("Servidor corriendo localhost  " + PORT)
});



// app.use("/", (req, res) => {
//     console.log(req.session)
//     req.session.cuenta = req.session.cuenta ? req.session.cuenta + 1 : 1;
//     res.status(200).send(`catidad de sessiones ${req.session.cuenta}`)
// });