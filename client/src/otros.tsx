import React, { useEffect, useState } from 'react';
import './App.css';
import { io } from 'socket.io-client';
import Login from './components/login/login';

type lista = {
  body: string,
  from: string
}

function Otro() {
  const socket = io('http://localhost:3900');
  const [mensaje, setMensaje] = useState<string>('');
  const [listaMsg, setListaMsg] = useState<lista[]>([]);

  useEffect(() => {

    const getMensaje = (msg: lista) => {
      setListaMsg([...listaMsg, msg])
    }

    socket.on('mensaje', getMensaje);

    socket.on('connect', () => {
      console.log(socket.id);
    })

    return () => {
      socket.off('mensaje', getMensaje);
    }
  },[listaMsg])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit('mensaje', mensaje);
    setListaMsg([...listaMsg, {body: mensaje, from: 'Yo'}])
    setMensaje('');
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setMensaje(e.target.value)} value={mensaje}/>
        <button type='submit'>send</button>
      </form>

    <div>
      {listaMsg.map((msg, index) => (
        <p key={index}>{msg.from}: {msg.body}</p>
      ))}
    </div>
    <Login/>
    </>
  );
}

export default Otro;
