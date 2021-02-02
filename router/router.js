'use strict';

const express = require('express');
const router = express.Router();

const passwordConfig = require('../config/passport');

const { verificaToken } = require('../middlewares/autenticacion');

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', '*')
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE ,PATCH ');

    //res.setHeader('Set-Cookie');
    next();
});


//importamos los controladores de rutas
const controladorUsuario = require('../controllers/usuariosController');

router.post("/crear-usuario", controladorUsuario.crearUsuarios);
router.post("/login", controladorUsuario.postLogin);
router.get("/logout", controladorUsuario.logout);
router.get("/lista-usuarios", verificaToken, controladorUsuario.getUsuarios);
router.get("/info-usuario", (req, res) => {
    res.json(req.user)
})
router.delete("/delete/:id", verificaToken, controladorUsuario.deleteUsuario);
router.put("/update/:id", verificaToken, controladorUsuario.updateUsuario);
router.get("/lista-usuario/:id",verificaToken, controladorUsuario.getOneUsuario);
router.get("/usuario-cedula/:id",controladorUsuario.getUserCedula);

//exportamos el modulo de router
module.exports = router;
