import "./ResultadosPorName.css"
import { useLocation } from "react-router-dom";
import { useFavoritas } from "../../context/FavoritesContext";

export const ResultadosPorName = () => {
  const location = useLocation()
  const { movies } = location.state || { results: [] }
  const { addFavoritas,esFavorita, eliminarFavoritas } = useFavoritas()

  const handleAddToFavoritas = (movie) => {
    addFavoritas(movie)
  };

  const handleRemoveFavoritas = (id) => {
    eliminarFavoritas(id)
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center">Resultados de búsqueda</h1>
      {movies.map((movie) => (
        <div key={movie.id} className="card">
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
                    onClick={() => handleAddToFavoritas(movie)}
                  >
                    Añadir a favoritas
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleRemoveFavoritas(movie.id)}
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
};


/*
fetch('https://api.themoviedb.org/3/movie/now_playing?language=es-ES&page=1&region=ES', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));

*/
