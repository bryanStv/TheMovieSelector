import "./ResultadosPorName.css"
import { useLocation } from "react-router-dom";

export const ResultadosPorName = () => {
  const location = useLocation();
  const { movies } = location.state || { results: [] };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Resultados de búsqueda</h1>
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
};
