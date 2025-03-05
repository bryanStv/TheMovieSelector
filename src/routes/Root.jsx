import { Outlet } from "react-router-dom";

import { Header } from "../components/Fixed/Header/Header.jsx";
import { Footer } from "../components/Fixed/Footer/Footer.jsx";
import { Favoritas } from "../pages/Favoritas/Favoritas.jsx";
import { useFavoritas } from "../context/FavoritasContext.jsx";

export const Root = () => {
  const { favoritas } = useFavoritas();
  return (
    <div className="container-fluid d-flex flex-column min-vh-100">
      <Header />

      <div className="row flex-grow-1">
        <div className={favoritas.length > 0 ? "col-md-8" : "col-md-12"}>
          <Outlet />
        </div>
        {favoritas.length > 0 && (
          <div className="col-md-4 d-none d-md-block">
            <Favoritas />
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};
