const Usuario = require('../models/usuariosModel');
const passport = require('passport');


const UsuariosController = {

    crearUsuarios: (req, res) => {

       
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
                        usuario.save((err, nuevoUsuario) => {
                            if (err) return res.status(500).send({ message: "Error al acceder a la base de datos" });
                            if (!nuevoUsuario) return res.status(401).send({ message: "el usuario no pudo ser creado" })
                            req.logIn(nuevoUsuario, (err) => {
                                if (err) return res.status(500).send("Error en guardar los datos");
                                res.status(200).send({ message: "Usuarios creado con exito", User: nuevoUsuario })
                            })
                        })
                    }
                    if (dosc) return res.status(200).send({ message: "El usuarios existe en la base de datos" })
                })
            }
        } else {
            res.status(404).send({ message: "formulario necesita sus datos" })
        }
    },
    postLogin: (req, res, next) => {
        passport.authenticate('local', (err, usuario, info) => {
            if (err) return res.status(404).send("Email no encontrado con exito");
            if (!usuario) return res.status(400).send({ message: "Email y contraseñas no validos" })
            req.logIn(usuario, (err) => {
                if (err) {
                    console.log(err);
                    console.log("error al hacer login");
                    next(err);
                }
                res.status(200).send({ message: "Login Exitoso" })
            })
        })(req, res, next)
    },
    logout: (req, res, next) => {
        req.logout();
        res.send('Logout exitoso')
    }
}

module.exports = UsuariosController;