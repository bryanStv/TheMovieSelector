import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
} from "react-router-dom";

import { Root } from "./Root.jsx";
import { Home } from "../pages/Home/Home.jsx";
import { Populares } from "../pages/populares/Populares.jsx";
import { ResultadosPorName } from "../pages/ResultadosPorName/ResultadosPorName.jsx";
import { FormularioContacto } from "../pages/FormularioContacto/FormularioContacto.jsx";

export const Routes = () => {
    const router = createBrowserRouter(
      createRoutesFromElements(
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />
            <Route path="/populares" element={<Populares />} />
            <Route path="/resultados/" element={<ResultadosPorName />} />
            <Route path="/formulario-contacto" element={<FormularioContacto />} />
        </Route>
      )
    );
  
    return <RouterProvider router={router} />;
};