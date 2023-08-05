import { useAppSelector } from "../../redux/hooks"
import cuaStyles from '../../assets/cuadroUsers.module.css';
import { mensaje } from "../../types/types";

export default function Mensaje ({mensajes}: {mensajes: mensaje[]}) {

    const nombre = useAppSelector(state => state.usuarioSlice.nombre);

    return (
        <div className={cuaStyles.mensajeContainer}>
            {mensajes.map((msg, index) => (
                <div className={ (msg.emi == nombre) ? cuaStyles.mensaje1 : cuaStyles.mensaje2} key={index}>
                    {msg.msg}
                </div>
            ))}
        </div>
    )
}