import { configureStore } from "@reduxjs/toolkit";
import usuarioSlice from "./usuarioSlice";

export const store = configureStore({
    reducer: {
        usuarioSlice
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch