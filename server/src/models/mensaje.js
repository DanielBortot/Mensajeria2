import mongoose from "mongoose";
const Schema = mongoose.Schema;

const mensajes = new Schema({
    msg: {type: String},
    date: {type: Date, default: Date.now},
    recep: {type: String},
    emi: {type: String}
});

const Mensaje = mongoose.model('Mensaje', mensajes);

export default Mensaje;