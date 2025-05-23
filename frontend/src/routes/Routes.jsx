import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
} from "react-router-dom";

import { Root } from "./Root.jsx";
import { Home } from "../pages/Home/Home.jsx";
import { Populares } from "../pages/Populares/Populares.jsx";
import { ResultadosPorName } from "../pages/ResultadosPorName/ResultadosPorName.jsx";
import { FormularioContacto } from "../pages/FormularioContacto/FormularioContacto.jsx";
import { Pelicula } from "../pages/Pelicula/Pelicula.jsx";
import { Cartelera } from "../pages/Cartelera/Cartelera.jsx";
import { PaginaError } from "../pages/PaginaError/PaginaError.jsx";
import { Login } from "../pages/Usuarios/Login/Login.jsx";
import { Register } from "../pages/Usuarios/Register/Register.jsx";
import { Perfil } from "../pages/Usuarios/Perfil/Perfil.jsx";

export const Routes = () => {
    const router = createBrowserRouter(
      createRoutesFromElements(
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />
            <Route path="/populares" element={<Populares />} />
            <Route path="/resultados/" element={<ResultadosPorName />} />
            <Route path="/formulario-contacto" element={<FormularioContacto />} />
            <Route path="/pelicula" element={<Pelicula />}/>
            <Route path="/cartelera" element={<Cartelera />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/perfil" element={<Perfil />}/>
            <Route path="*" element={<PaginaError />} />
        </Route>
      )
    );
  
    return <RouterProvider router={router} />;
};