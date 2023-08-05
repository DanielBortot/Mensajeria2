import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    nombre: '',
    alias: '',
    new: false,
    vista: { nombre: '', alias: '', status: '' }
}

export const usuarioSlice = createSlice({
    name: 'conter',
    initialState,
    reducers: {
        setUser: (state, actions) => {
            state.nombre = actions.payload.nombre;
            state.alias = actions.payload.alias;
            state.new = actions.payload.new;
            console.log(actions.payload);
        },
        delUser: (state) => {
            state.nombre = '';
            state.alias = '';
            state.new = false;
        },
        setVista: (state, actions) => {
            state.vista = actions.payload.pers;
        }
    }
});

export const {setUser, delUser, setVista} = usuarioSlice.actions
export default usuarioSlice.reducer