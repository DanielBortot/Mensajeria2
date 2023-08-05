import mongoose from "mongoose";
const Schema = mongoose.Schema;

const usuarios = new Schema({
    nombre: {type: String},
    password: {type: String},
    alias: {type: String}
});

const Usuario = mongoose.model('Usuario', usuarios);

export default Usuario;