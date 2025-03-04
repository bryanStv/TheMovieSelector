import "./Populares.css"

import { useEffect, useState } from "react";
import { useFavoritas } from "../../context/FavoritesContext";

export const Populares = () => {
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    const [movies, setMovies] = useState([]);
    const { addFavoritas,esFavorita, eliminarFavoritas } = useFavoritas()

    const getPopularMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?language=es-ES&page=1&api_key=${API_KEY}`
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
        setMovies(data.results);
        //console.log(data.results);
      }
    };

    useEffect(() => {
      fetchMovies();
    }, []);

    return (
      <div className="container mt-5">
        <h1 className="text-center">Películas populares</h1>
        <br />
        {movies.map((movie) => (
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">{movie.title}</h2>
            </div>
            <div className="card-body row">
              <img
                className="col-md-2"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="col-md-10">
                <p className="card-text">{movie.overview}</p>
                <p className="card-text">
                  Fecha de lanzamiento: {movie.release_date}
                </p>
                <div
                  className="btn-group"
                  role="group"
                  aria-label="grupoBotonesPeliculas"
                >
                  <button type="button" className="btn btn-primary">
                    Detalles
                  </button>
                  <button type="button" className="btn btn-primary">
                    Placeholder
                  </button>
                  {!esFavorita(movie.id) ? (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => addFavoritas(movie)}
                    >
                      Añadir a favoritas
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => eliminarFavoritas(movie.id)}
                    >
                      Eliminar de favoritas
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
}