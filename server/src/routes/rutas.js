import { Router } from "express";
import { io } from "../server.js";
import controUsers from "../controllers/user.js";
import controMensaje from "../controllers/ingreso.js";

const router = Router();
let usuarios = [];

io.on('connection', (socket) => {
    
    console.log('Se ha conectado: ', socket.id);

    socket.on('mensaje', (msg) => {
        socket.broadcast.emit('mensaje', {
            body: msg,
            from: socket.id
        });
    })

    socket.on('usuario', usuario => {
        usuarios.push({nombre: usuario, id: socket.id});
        socket.broadcast.emit('usuario', {nombre: usuario, status: 'Online'})
        console.log(usuarios);
    })

    socket.on('newUser', usuario => {
        socket.broadcast.emit('newUser', {...usuario, status: 'Online'});
    })

    socket.on('newMensaje', msg => {
        const id = usuarios.findIndex(user => user.nombre == msg.recep);
        if (id > -1) {
            io.to(usuarios[id].id).emit('newMensaje', msg);
        }
    })

    socket.on('disconnect', () => {
        console.log('Se ha desconectado: ', socket.id);

        const index = usuarios.findIndex(usuario => usuario.id == socket.id);
        if (index > -1) {
            socket.broadcast.emit('desc', {nombre: usuarios[index]?.nombre, status: 'Offline'})
            usuarios = usuarios.filter(usuario => usuario.id != socket.id);
        }
        console.log(usuarios);
    })
})

router.post('/logueo', (req,res) => {
    controUsers.logueo(req,res,usuarios);
});
router.post('/registro', controUsers.registro);
router.post('/getUsers', (req,res) => {
    controUsers.getUsers(req, res, usuarios);
});

router.post('/addMensaje', controMensaje.addMensaje);
router.post('/getMensajes', controMensaje.getMensajes);

export default router;