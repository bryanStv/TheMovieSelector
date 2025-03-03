import "./Populares.css"

import { useEffect, useState } from "react";

export const Populares = () => {
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    const [movies, setMovies] = useState([]);

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
        <h1 className="text-center">Películas populares actualmente</h1>
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
                <a href="#" className="btn btn-primary">
                  Detalles de la película
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
}