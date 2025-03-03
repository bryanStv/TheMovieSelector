import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
} from "react-router-dom";

import { Root } from "./Root.jsx";
import { Home } from "../pages/Home/Home.jsx";

export const Routes = () => {
    const router = createBrowserRouter(
      createRoutesFromElements(
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />
        </Route>
      )
    );
  
    return <RouterProvider router={router} />;
};