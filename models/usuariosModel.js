const bycrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nombre: { type: String, required: true }
}, {
    timestamps: true,
})


// usuarioSchema.pre('save', (next) => {
//     const usuario = this;
//     if (!usuario.isModified('password')) {
//         return next();
//     }

//     bycrypt.genSalt(10, (err, salt) => {
//         if (err) {
//             next(err);
//         }
//         bycrypt.hash(usuario.password, salt, null, (err, hash) => {
//             if (err) {
//                 next(err);
//             }
//             usuario.password = hash;
//             console.log(usuario.password);
//             next();
//         })
//     })
// })

// usuarioSchema.methods.compararPassword = function (password, cb) {
//     bycrypt.compare(password, this.password, (err, sonIguales) => {
//         if (err) {
//             return cb(err);
//         }
//         cb(null, sonIguales)
//     })
// }


module.exports = mongoose.model('Usuarios', usuarioSchema);

