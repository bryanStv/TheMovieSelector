import "./Favoritas.css"

import { useFavoritas } from "../../context/FavoritasContext"
import { useNavigate } from "react-router-dom";
import placeholderMovieCover from "../../assets/placeholderPoster.jpg"
import { FormattedMessage } from "react-intl";

export const Favoritas = () => {
    const { favoritas, eliminarFavoritas } = useFavoritas();
    const navigate = useNavigate()

    const gotoPeli = (movie) => {
      navigate("/pelicula", { state: { movie } });
    };

    return (
      <div id="favoritas">
        <h1>
          <FormattedMessage
            id="message.favorites-title"
            defaultMessage="Favoritas ({contador})"
            values={{ contador: favoritas.length }}
          />
        </h1>
        <div className="favoritas-lista">
          {favoritas.map((movie) => (
            <div
              key={movie.id}
              className="favorita-item d-flex flex-column align-items-center"
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : placeholderMovieCover
                }
                alt={movie.title}
              />

              <div
                className="btn-group"
                role="group"
                aria-label="grupoBotonesPeliculas"
              >
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => gotoPeli(movie)}
                >
                  <FormattedMessage
                    id="message.favorites-details"
                    defaultMessage="Detalles"
                  />
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => eliminarFavoritas(movie.id)}
                >
                  <FormattedMessage
                    id="message.favorites-remove"
                    defaultMessage="Eliminar"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}
