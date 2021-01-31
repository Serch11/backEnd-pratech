const Usuario = require('../models/usuariosModel');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UsuariosController = {


    crearUsuarios: (req, res) => {

        console.log(typeof req.body.email === 'string')
        if (typeof req.body.email === 'string' && typeof req.body.password === 'string') {

            if (req.body.email && req.body.password) {
                console.log(req.body.email)
                Usuario.findOne({ email: req.body.email }, (err, dosc) => {
                    if (err) return res.status(500).send({ message: "Error al buscar en la base de datos" });
                    if (!dosc) {

                        let usuario = new Usuario();
                        usuario.email = req.body.email;
                        usuario.password = req.body.password;
                        usuario.nombre = req.body.nombre;

                        
                        console.log(usuario);
                        usuario.save((err, dosc) => {
                            if (err) return res.status(500).send({ message: "Error al acceder a la base de datos" });
                            if (!usuario) return res.status(401).send({ message: "el usuario no pudo ser creado" })
                            return res.status(200).send({ message: dosc })
                        })
                    }
                    if (dosc) return res.status(200).send({ message: "El usuarios existe en la base de datos" })
                })
            }
        } else {
            res.status(404).send({ message: "formulario necesita sus datos" })
        }
    }
}
 
module.exports = UsuariosController;