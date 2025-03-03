import { Outlet } from "react-router-dom";

import { Header } from "../components/Fixed/Header/Header.jsx";
import { Footer } from "../components/Fixed/Footer/Footer.jsx";

export const Root = () => {
  return (
    <div>
      <Header />

      <Outlet />

      <Footer />
    </div>
  );
};
