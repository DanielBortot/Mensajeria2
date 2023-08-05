import {useState} from 'react';
import axios from 'axios';
import { useAppDispatch } from '../../redux/hooks';
import { setUser } from '../../redux/usuarioSlice';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

export default function Registro () {
    const [nombre, setNombre] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [alias, setAlias] = useState<string>('');
    const [error, setError] = useState<string>('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await (await axios.post('/api/registro', {nombre, password, alias})).data;
        if (res.nombre) {
            dispatch(setUser({nombre: res.nombre, alias: res.alias, new: true}))
            navigate('/');
        }
        else {
            setError(res.status);
        }
    }

    return (

        <ThemeProvider theme={darkTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    {error ? <span style={{color: "#f12e28"}}>{error}</span> : ''}
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="nombre"
                            label="Nombre de Usuario"
                            name="nombre"
                            value={nombre}
                            onChange={ e => setNombre(e.target.value)}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="alias"
                            label="Alias del Usuario"
                            id="alias"
                            onChange={ e => setAlias(e.target.value)}
                            value={alias}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type="password"
                            id="password"
                            onChange={ e => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Ingresar
                        </Button>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <Link to={'/login'} style={{color: "#44b4ff"}}>
                                    {"Ingresar con una cuenta ya existente"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>

        // <div>
        //     <form onSubmit={handleSubmit}>
        //         <input type="text" placeholder="Usuario" value={nombre} onChange={ e => setNombre(e.target.value)}/>
        //         <input type="text" placeholder="Alias" value={alias} onChange={ e => setAlias(e.target.value)}/>
        //         <input type="password" placeholder="Contraseña" value={password} onChange={ e => setPassword(e.target.value)}/>
        //         <button type="submit">Ingresar</button>
        //     </form>
        // </div>
    )
}