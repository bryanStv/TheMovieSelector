import "./NavBar.css"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import MovieLogo from "../../../../assets/movie-tickets-svgrepo-com.svg"

export const NavBar = () => {
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const [buscarPeli, setBuscarPeli] = useState("");
  //const [movieResultados, setMovieResultados] = useState([]);
  const navigate = useNavigate();

  //const [pagina, setPagina] = useState(1);
  //const [totalPaginas, setTotalPaginas] = useState(0);

  const fetchPeliculaByTitulo = async (titulo) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${titulo}&language=es-ES&page=1&api_key=${API_KEY}`
    );
    const data = await response.json();
    //return data.results;
    return data;
  };

  const handleBuscarPeli = async (e) => {
    e.preventDefault();

    if (buscarPeli.trim() === "") return;

    const movies = await fetchPeliculaByTitulo(buscarPeli);

    /*if(movies){
      setTotalPaginas(movies.total_pages);
    }*/

    //navigate("/resultados", { state: { movies: movies.results, totalPaginas: totalPaginas } });
    navigate("/resultados", {state: { movies: movies.results}});
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
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/populares">
                Populares
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
                Dropdown
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/formulario-contacto" className="dropdown-item">
                    Contacto
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
            <li className="nav-item">
              <Link to="/cartelera" className="nav-link">Cartelera España</Link>
            </li>
          </ul>
          <form className="d-flex" role="search" onSubmit={handleBuscarPeli}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Buscar película"
              aria-label="Search"
              value={buscarPeli}
              onChange={(e) => setBuscarPeli(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">
              Buscar
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}