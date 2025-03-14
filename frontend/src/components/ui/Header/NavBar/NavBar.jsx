import "./NavBar.css"
import { Link } from "react-router-dom";
//import { useState } from "react";
import MovieLogo from "../../../../assets/movie-tickets-svgrepo-com.svg"
import { ButtonsSelectorLenguaje } from "../../../ui/Elementos/Buttons/ButtonsSelectorLenguaje.jsx"
import { FormattedMessage,useIntl } from "react-intl";
//import { useSearchFetchTMDB } from "../../../../apis/useSearchFetchTMDB.jsx";
import { useBuscarContext } from "../../../../context/BuscarContext.jsx";
import { useAuth } from "../../../../context/AuthContext.jsx";

export const NavBar = () => {

  const { query, setQuery } = useBuscarContext();
  const { formatMessage } = useIntl();
  const { user } = useAuth();
  let enlace = "/login"

  if(user){
    enlace = "/perfil"
  }

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" aria-current="page" to="/">
          <img src={MovieLogo} width={40} height={32} alt="TheMovieSelector" />
          The Movie Selector
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                <FormattedMessage
                  id="message.nav-home"
                  defaultMessage="Inicio"
                />
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/populares">
                <FormattedMessage
                  id="message.nav-popular"
                  defaultMessage="Populares"
                />
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/cartelera" className="nav-link">
                <FormattedMessage
                  id="message.nav-spain-current"
                  defaultMessage="Cartelera España"
                />
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FormattedMessage
                  id="message.nav-dropdown"
                  defaultMessage="Menú desplegable"
                />
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/formulario-contacto" className="dropdown-item">
                    <FormattedMessage
                      id="message.nav-dropdown-contact"
                      defaultMessage="Contacto"
                    />
                  </Link>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
          </ul>

          <span className="me-3">
            <ButtonsSelectorLenguaje />
          </span>

          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder={formatMessage({
                id: "message.nav-search",
                defaultMessage: "Buscar películas",
              })}
              aria-label="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {/*<button className="btn btn-outline-success" type="submit">
              <FormattedMessage
                id="message.nav-search-button"
                defaultMessage="Buscar"
              />
            </button>*/}
            <span>
              <Link to={enlace} className="btn btn-success position-relative">
                {user ? user.usuario : "Perfil" }
              </Link>
            </span>
          </form>
        </div>
      </div>
    </nav>
  );
};