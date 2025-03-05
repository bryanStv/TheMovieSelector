import "./Cartelera.css";

import { useState, useEffect } from "react";
import { useFavoritas } from "../../context/FavoritasContext";
import { useNavigate } from "react-router-dom";
import { CardPelis } from "../../components/ui/Elementos/Cards/CardPelis";

export const Cartelera = () => {
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const [movies, setMovies] = useState([]);
  const { addFavoritas,esFavorita, eliminarFavoritas } = useFavoritas()
  const navigate = useNavigate()

  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(0);

  const fetchPeliculasCartelera = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?language=es-ES&region=ES&page=${pagina}&api_key=${API_KEY}`
    );
    const data = await response.json();
    return data.results;
  };

  const fetchMovies = async () => {
    const data = await fetchPeliculasCartelera();

    if (data) {
      setTotalPaginas(data.total_pages);
      setMovies(data);
    }
  };

  const gotoPeli = (movie) => {
      navigate("/pelicula", { state: { movie } });
  };

  const paginacionFetchSig = () => {
    if (pagina >= 1) {
      setPagina(pagina + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const paginacionFetchAnt = () => {
    if (pagina > 1) {
      setPagina(pagina - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [pagina]);

  return (
    <>
      <div className="container mt-5">
        <h1 className="text-center">Cartelera España</h1>
        <br />
        {movies.map((movie) => (
          <CardPelis
            key={movie.id}
            movie={movie}
            gotoPeli={gotoPeli}
            esFavorita={esFavorita}
            addFavoritas={addFavoritas}
            eliminarFavoritas={eliminarFavoritas}
          />
        ))}

        <div
          className="btn-group d-flex justify-content-center"
          role="group"
          aria-label="grupoBotonesPaginacion"
        >
          <button
            type="button"
            className="btn btn-primary"
            onClick={paginacionFetchAnt}
            disabled={pagina <= 1}
          >
            Anterior
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={paginacionFetchSig}
            disabled={pagina >= totalPaginas}
          >
            Siguiente
          </button>
        </div>
      </div>
    </>
  );
};
