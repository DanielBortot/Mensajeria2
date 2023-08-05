import Login from "./components/login/login";
import Registro from "./components/login/registro";
import Inicio from "./components/inicio/inicio";
import { RouteProtectUser } from "./components/RouteProtectUser";
import { Route, Routes } from 'react-router-dom';
import './assets/App.css';

export default function App () {
  return (
    <div className="App">
      <Routes>
        <Route element={<RouteProtectUser/>}>
          <Route path={'/'} element={<Inicio/>}/>
        </Route>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Registro/>}/>
      </Routes>
    </div>
  );
}