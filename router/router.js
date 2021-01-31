'use strict';

const express = require('express');
const router = express.Router();

const passwordConfig = require('../config/passport');


router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE ,PATCH ');
    next();
});


//importamos los controladores de rutas
const controladorUsuario = require('../controllers/usuariosController');


router.post("/crear-usuario", controladorUsuario.crearUsuarios);
router.post("/login", controladorUsuario.postLogin);
router.get("/logout", passwordConfig.estaAutenticado, controladorUsuario.logout);

router.get("/info-usuario", passwordConfig.estaAutenticado, (req, res) => {
    res.json(req.user)
})
//exportamos el modulo de router
module.exports = router;
