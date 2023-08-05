import { useEffect, useState } from "react";
import socket from "../../socket";
import { useAppSelector } from "../../redux/hooks";
import axios from "axios";
import CuadroUser from "./cuadroUser";
import List from "@mui/material/List";
import cuaStyles from '../../assets/cuadroUsers.module.css';
import Chat from "./chat";
import { mensaje, user } from "../../types/types";



export default function Inicio () {
    const [users, setUsers] = useState<user[]>([]);
    const [mensajes, setMensajes] = useState<mensaje[]>([]);
    const usuario = useAppSelector(state => state.usuarioSlice);

    useEffect(() => {
      socket.emit('usuario', usuario.nombre);

      if (usuario.new) {
        socket.emit('newUser', {nombre: usuario.nombre, alias: usuario.alias});
      }

      const usersDB = async () => {
        const usuarios = await (await axios.post('/api/getUsers', {nombre: usuario.nombre, alias: usuario.alias})).data;
        console.log(usuarios);
        setUsers(usuarios);
      }

      usersDB();
    },[]);

    useEffect(() => {
      const getUsers = (usu: user) => {
        setUsers([...users, usu]);
      }

      const getMensajes = (msg: mensaje) => {
        if (usuario.vista.nombre === msg.emi) {
          setMensajes([...mensajes, msg]);
        }
      }

      const updateStatus = (usu: user) => {
        const index = users.findIndex(user => user.nombre == usu.nombre);
        let newUsus = [...users];
        console.log(usu);
        console.log(newUsus);
        newUsus[index] = {...newUsus[index], status: usu.status}
        setUsers(newUsus);
      }

      socket.on('usuario', updateStatus);
      socket.on('desc', updateStatus);
      socket.on('newUser', getUsers);
      socket.on('newMensaje', getMensajes);

      return () => {
        socket.off('newUser', getUsers);
        socket.off('newMensaje', getMensajes);
        socket.off('usuario', updateStatus);
        socket.off('desc', updateStatus);
      }
    },[users, mensajes]);

    const sendMensaje = async (msg: string) => {
      const newMsg = {msg, emi: usuario.nombre, recep: usuario.vista.nombre, date: Date.now()}
      setMensajes([...mensajes, newMsg]);
      const res = await (await axios.post('/api/addMensaje', newMsg)).data;
      if (res) {
        socket.emit('newMensaje', newMsg);
      }
    }

    return (
      <div className={cuaStyles.inicio}>
        <List sx={{ width: "100%", height: "100vh", bgcolor: "#121212", padding: 0, overflowY: 'scroll'}}>
          {users.map(user => (
            <CuadroUser key={user.nombre} user={user} setMensajes={setMensajes}/>
          ))}
        </List>
        {usuario.vista.nombre ? <Chat pers={usuario.vista} sendMensaje={sendMensaje} mensajes={mensajes}/> : ''}
      </div>
    );
}