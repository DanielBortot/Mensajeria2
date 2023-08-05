import * as React from "react";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import cuaStyles from "../../assets/cuadroUsers.module.css";
import { setVista } from "../../redux/usuarioSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import axios from "axios";
import { mensaje, user } from "../../types/types";


export default function CuadroUser({ user, setMensajes }: { user: user, setMensajes: React.Dispatch<React.SetStateAction<mensaje[]>> }) {
    const perfil = useAppSelector(state => state.usuarioSlice.nombre);
    const dispatch = useAppDispatch();

    const getMensajes = async () => {
        dispatch(setVista({pers: user}))
        console.log(user);
        setMensajes([]);
        const res = await (await axios.post('/api/getMensajes',{vista: user.nombre, nombre: perfil})).data;
        setMensajes(res);
    }

    return (
            <>
                <ListItem alignItems="flex-start" className={cuaStyles.cuadro} onClick={() => getMensajes()}>
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="#" />
                    </ListItemAvatar>

                    <ListItemText
                        primary={user.alias}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: "inline" }}
                                    component="span"
                                    variant="body2"
                                    color="white"
                                >
                                    {user.status}
                                </Typography>
                            </React.Fragment>
                        }
                    />
                    </ListItem>
                <Divider variant="inset" component="li" />
            </>
    );
}
