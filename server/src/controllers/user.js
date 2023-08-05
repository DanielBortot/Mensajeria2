import Usuario from "../models/usuario.js";

const controUsers = {
    registro: async (req, res) => {
        const {nombre, alias, password} = req.body;

        try {
            const prueba = await Usuario.find({nombre: nombre});
            if (prueba.length > 0) {
                return res.status(200).send({status: 'Ya existe una cuenta con ese nombre'});
            }
            const user = new Usuario({nombre,alias,password});
            const obj = await user.save();
            return res.status(200).send(obj);

        } catch (err) {
            console.log(err);
            return res.status(500).send({status: 'error'});
        }
    },

    logueo: async (req, res, users) => {
        const {nombre, password} = req.body;
        
        try {
            const usuario = await Usuario.findOne({nombre, password});
            if (!usuario){
                res.status(200).send({status: 'Nombre o Contraseña incorrecta'});
                return null;
            }
            else if (users.find(user => user.nombre == usuario.nombre)) {
                res.status(200).send({status: 'El usuario ya esta logueado'});
                return null;
            }
            res.status(200).send(usuario);
            return usuario.nombre;

        } catch(err) {
            console.log(err);
            res.status(404).send({status: 'error'});
            return null;
        }

    },

    getUsers: async (req,res,users) => {
        const {nombre} = req.body

        try {
            let usuarios = await Usuario.find();
            usuarios = usuarios.filter(usuario => usuario.nombre != nombre);
            let envio = [];

            for (let i=0; i<usuarios.length; i++) {
                envio.push({nombre: usuarios[i].nombre, password: usuarios[i].password, alias: usuarios[i].alias});

                if (users.find(user => user.nombre == usuarios[i].nombre)) {
                    envio[i] = {...envio[i], status: 'Online'}
                }
                else {
                    envio[i] = {...envio[i], status: 'Offline'}
                }
            }
            res.status(200).send(envio);
            return usuarios;

        } catch (err) {
            console.log(err);
            res.status(404).send({status: 'error'});
            return null
        }
    }
}

export default controUsers;