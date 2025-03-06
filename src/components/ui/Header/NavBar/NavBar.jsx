import "./NavBar.css"
import { Form, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import MovieLogo from "../../../../assets/movie-tickets-svgrepo-com.svg"
import { ButtonsSelectorLenguaje } from "../../../ui/Elementos/Buttons/ButtonsSelectorLenguaje.jsx"
import { FormattedMessage,useIntl } from "react-intl";

export const NavBar = () => {
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const [buscarPeli, setBuscarPeli] = useState("");
  const navigate = useNavigate();
  const { formatMessage } = useIntl();


  const fetchPeliculaByTitulo = async (titulo) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${titulo}&language=es-ES&page=1&api_key=${API_KEY}`
    );
    const data = await response.json();
    return data;
  };

  const handleBuscarPeli = async (e) => {
    e.preventDefault();

    if (buscarPeli.trim() === "") return;

    const movies = await fetchPeliculaByTitulo(buscarPeli);

    navigate("/resultados", { state: { movies: movies.results } });
  };

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

          <ButtonsSelectorLenguaje />

          <form className="d-flex" role="search" onSubmit={handleBuscarPeli}>
            <input
              className="form-control me-2"
              type="search"
              placeholder={formatMessage({
                id: "message.nav-search",
                defaultMessage: "Buscar películas",
              })}
              aria-label="Search"
              value={buscarPeli}
              onChange={(e) => setBuscarPeli(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">
              <FormattedMessage
                id="message.nav-search-button"
                defaultMessage="Buscar"
              />
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};