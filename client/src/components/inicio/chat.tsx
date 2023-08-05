import Avatar from '@mui/material/Avatar';
import cuaStyles from '../../assets/cuadroUsers.module.css';
import SendIcon from '@mui/icons-material/Send';
import Mensaje from './mensaje';
import { useRef, useState } from 'react';
import { mensaje, user } from "../../types/types";

export default function Chat ({pers, mensajes, sendMensaje}: {pers: user, mensajes: mensaje[], sendMensaje: (msg: string) => Promise<void>}) {

    const [mensaje, setMensaje] = useState<string>('');
    const msgContainer = useRef<HTMLDivElement>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendMensaje(mensaje);
        setMensaje('');
        if (msgContainer.current) {
            msgContainer.current.scrollIntoView({behavior: "smooth"});
        }
    }

    return (
        <div className={cuaStyles.chatContainer}>
            <div className={cuaStyles.barraChat}>
                <Avatar alt="Remy Sharp" src="#" style={{marginRight: '20px'}}/>
                <p className={cuaStyles.textoNombre}>{pers.alias}</p>
            </div>
            <div className={cuaStyles.cuadroTexto}>
                <Mensaje mensajes={mensajes}/>
                <div ref={msgContainer}/>
            </div>
            <div>
                <form onSubmit={handleSubmit} className={cuaStyles.inputContainer}>
                    <input type="text" placeholder='Escribe un Mensaje' className={cuaStyles.input} value={mensaje} onChange={ e => setMensaje(e.target.value)}/>
                    <button type={'submit'} className={cuaStyles.enviarMsg}><SendIcon className={cuaStyles.icon}/></button>
                </form>
            </div>
        </div>
    );
}