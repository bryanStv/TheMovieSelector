import "./Favoritas.css"

import { useFavoritas } from "../../context/FavoritesContext"

export const Favoritas = ({ favorites }) => {
    const { favoritas, eliminarFavoritas } = useFavoritas();
    return (
      <div id="favoritas">
        <h1>favoritas({favoritas.length})</h1>
        <div className="favoritas-lista">
          {favorites.map((movie) => (
            <div key={movie.id} className="favorita-item d-flex flex-column align-items-center">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <br/>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => eliminarFavoritas(movie.id)}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </div>
    );
}
