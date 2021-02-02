const Usuario = require('../models/usuariosModel');
const passport = require('passport');
const jwt = require('jsonwebtoken');


const UsuariosController = {
    
        crearUsuarios: (req, res) => {
            var cedula = req.body.cedula;
            var email = req.body.email;
            console.log(req.body)
        if (typeof req.body.email === 'string' && typeof req.body.password === 'string') {

            if (req.body.email && req.body.password) {
                console.log(req.body.email)
                Usuario.findOne({ email: email }, (err, dosc) => {
                    if (err) return res.status(500).send({ message: "Error al buscar en la base de datos" });
                    if (!dosc) {
                        console.log("entro en la cedula")
                        Usuario.findOne({ cedula:cedula }, (err, dosc) => {
                            if (err) return res.status(500).send({ message: "Error al buscar en la base de datos" });
                            if (!dosc) {
                                let usuario = new Usuario();
                                usuario.email = req.body.email;
                                usuario.password = req.body.password;
                                usuario.nombres = req.body.nombres;
                                usuario.cedula = req.body.cedula;
                                usuario.genero = req.body.genero;


                                console.log(usuario);
                                usuario.save((err, nuevoUsuario) => {
                                    if (err) return res.status(500).send({ message: "Error al acceder a la base de datos" });
                                    if (!nuevoUsuario) return res.status(401).send({ message: "el usuario no pudo ser creado" })
                                    req.logIn(nuevoUsuario, (err) => {
                                        if (err) return res.status(500).send("Error en guardar los datos");
                                        res.status(200).send({ message: "Usuarios creado con exito", User: nuevoUsuario, ok: true })
                                    })
                                })
                            }
                        })
                    }
                    if (dosc) return res.json({ message: "El usuarios existe en la base de datos", ok: false })
                })
            }
        } else {
            res.status(404).send({ message: "formulario necesita sus datos" })
        }
    },
    postLogin: (req, res, next) => {

        //console.log(TOKEN_SECRET)
        passport.authenticate('local', (err, usuario, info) => {
            let token = jwt.sign({
                usuario: usuario
            }, 'secret', { expiresIn: 60 * 60 * 24 });

            if (err) return res.status(404).send("Email no encontrado con exito");
            if (!usuario) return res.status(400).send({ message: "Email y contraseñas no validos" })
            req.logIn(usuario, (err) => {
                if (err) {
                    console.log(err);
                    console.log("error al hacer login");
                    next(err);
                }
                res.status(200).send({ message: "Login Exitoso", token: token, usuario: usuario });
            })
        })(req, res, next)
    },
    logout: (req, res, next) => {
        req.logout();
        console.log(req)
        res.status(200).send({ message: "Logout Exitoso" })
    },
    getUsuarios: (req, res) => {

        Usuario.find({}, (err, usuarios) => {
            if (err) return res.status(200).send({ message: "No se pudo accerder a la base de datos" });
            if (!usuarios) return res.status(401).send({ message: "No se encontro la coleccion de usuarios" });
            return res.status(200).json({ usuarios })
        })
    },
    deleteUsuario: (req, res) => {
        let id = req.params.id;
        console.log(id);
        if (id) {
            Usuario.findByIdAndDelete(id, (err, usuario) => {
                if (err) return res.status(500).send({ message: "Error del servidor" });
                if (!usuario) return res.status(401).send({ message: "Usuario no encontrado en la base de datos" });
                return res.status(200).json({ ok: true, message: " elimado con exito", usuario });
            })
        }
    },

    updateUsuario: (req, res) => {
        let id = req.params.id;
        let usuario = req.body
        console.log(id)
        console.log(req.body);
        Usuario.findByIdAndUpdate(id, usuario, (err, docs) => {
            if (err) return res.status(500).send({ message: "Erro del servidor" });
            if (!docs) return res.status(401).send({ message: "No se pudo guardar los datos del usuario" });
            return res.status(200).send({ message: "Usuario Actualizado con exito", ok: true, docs })
        })
    },
    getOneUsuario: (req, res) => {
        let id = req.params.id;
        console.log(id)
        Usuario.findById(id, (err, usuario) => {
            if (err) return res.status(500).send({ message: "Erro del servidor" });
            if (!usuario) return res.status(401).send({ message: "No se pudo guardar los datos del usuario" });
            return res.status(200).json({ usuario })
        })
    },
    getUserCedula: (req, res) => {
        let cedula = req.params.id;
        console.log(cedula)
        if (cedula) {
            Usuario.findOne({ cedula: cedula }, (err, user) => {
                if (err) return res.status(500).send({ message: "Error del servidor" });
                if (!user) return res.status(401).send({ message: "Usuario no encontrado" });
                return res.status(200).json({ user })
            })
        }
    }
}
module.exports = UsuariosController;