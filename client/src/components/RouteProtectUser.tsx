import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

function RouteProtectUser ({redirectionTo='/login'}) { 
    const nombre = useAppSelector(state => state.usuarioSlice.nombre);
    
    if (!nombre){
        return <Navigate to={redirectionTo}/>
    }
    return <Outlet/>;
}

export {RouteProtectUser};