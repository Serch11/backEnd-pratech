'use strict';
//verificamos el token
const jwt = require('jsonwebtoken');

let verificaToken = (req, res, next) => {

    let token = req.get("Authorization");
    //console.log(token)
    

    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) return res.status(401).send({ ok: false, err })
        //console.log(decoded)
        //console.log(req.usuario)
        req.usuario = decoded.usuario;
        //console.log(req.usuario)
        next();
    });



}

module.exports = { verificaToken } 