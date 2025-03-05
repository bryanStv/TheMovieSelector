import "./Populares.css"

import { useEffect, useState } from "react";
import { useFavoritas } from "../../context/FavoritasContext";
import { useNavigate } from "react-router-dom";
import { CardPelis } from "../../components/ui/Elementos/Cards/CardPelis";

export const Populares = () => {
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    const [movies, setMovies] = useState([]);
    const { addFavoritas,esFavorita, eliminarFavoritas } = useFavoritas()
    const [pagina, setPagina] = useState(1);
    //let totalPaginas = 0;
    const [totalPaginas, setTotalPaginas] = useState(0);


    const navigate = useNavigate();

    const getPopularMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?language=es-ES&page=${pagina}&api_key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Error obteniendo películas");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(error);
        return null;
      }
    };

    const fetchMovies = async () => {
      const data = await getPopularMovies();
      if (data && data.results) {
        setTotalPaginas(data.total_pages);
        setMovies(data.results);
        //console.log(data.results);
      }
    };

    const gotoPeli = (movie) => {
      navigate("/pelicula", { state: { movie } });
    }

    const paginacionFetchSig = () => {
      if(pagina >= 1){
        setPagina(pagina + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }

    const paginacionFetchAnt = () => {
      if(pagina > 1){
        setPagina(pagina - 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }

    useEffect(() => {
      fetchMovies();
    }, [pagina]);

    return (
      <div className="container mt-5">
        <h1 className="text-center">Películas populares</h1>
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
    );
}