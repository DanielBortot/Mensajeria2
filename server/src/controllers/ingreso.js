import Mensaje from "../models/mensaje.js";

const controMensaje = {
    addMensaje: async (req,res) => {
        const {msg, recep, emi, date} = req.body;
        const mensaje = new Mensaje({msg,recep,emi,date});

        try {
            const obj = await mensaje.save();
            res.status(200).send(true);
            return obj;

        } catch (err) {
            console.log(err);
            res.status(500).send(false);
            return err;
        }
    },

    getMensajes: async (req,res) => {
        const {nombre, vista} = req.body;
        
        try {
            const mensajes = await Mensaje.find({$and: [ { $or: [ {emi: nombre}, {emi: vista} ] }, { $or: [ {recep: nombre}, {recep: vista} ] } ] } );
            res.status(200).send(mensajes);
            return mensajes;

        } catch(err) {
            console.log(err);
            res.status(500).send({status: 'error'});
        }
    }
}

export default controMensaje;