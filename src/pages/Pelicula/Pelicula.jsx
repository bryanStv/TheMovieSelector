import "./Pelicula.css"
import { useLocation } from "react-router-dom";

export const Pelicula = () => {
    const location = useLocation();
    const { movie } = location.state || { movies: [] };


    return (
      <div className="pelicula">
        <h2>{movie.title}</h2>
        <img
          className={`Poster de ${movie.title}`}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <p>Fecha de estreno: {movie.release_date}</p>
        <p>Popularidad: {movie.popularity}</p>
        <p>Número de votos: {movie.vote_count}</p>
        <p>Nota promedio: {movie.vote_average}</p>
        <p>Descripción: {movie.overview}</p>
      </div>
    );
}