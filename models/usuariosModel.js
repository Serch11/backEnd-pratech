const bycrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nombres: { type: String, required: true },
    cedula: { type: String, required: true },
    genero: { type: String, required: true }
}, {
    timestamps: true,
})




usuarioSchema.pre('save', async function (next) {
    // Only run this function if password was moddified (not on other update functions)
    if (!this.isModified('password')) return next();
    // Hash password with strength of 12
    this.password = await bycrypt.hash(this.password, 12);
    //remove the confirm field 
    this.passwordConfirm = undefined;
});

usuarioSchema.methods.compararPassword = function (password, cb) {
    bycrypt.compare(password, this.password, (err, sonIguales) => {
        if (err) {
            return cb(err);
        }
        cb(null, sonIguales)
    })
}


module.exports = mongoose.model('Usuarios', usuarioSchema);

