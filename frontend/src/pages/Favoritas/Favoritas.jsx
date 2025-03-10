import "./Favoritas.css"

import { useFavoritas } from "../../context/FavoritasContext"
import { useNavigate } from "react-router-dom";
import placeholderMovieCover from "../../assets/placeholderPoster.jpg"
import { FormattedMessage } from "react-intl";
import { useContador } from "../../hooks/contador";

export const Favoritas = () => {
    const { favoritas, eliminarFavoritas } = useFavoritas()
    const navigate = useNavigate()
    const contadorMeGusta = useContador()
    const contadorPersonas = useContador()

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
        
        <div
          id="favoritos-contadores"
          className="d-flex align-items-center gap-3 flex-wrap mt-3"
        >
          <div className="d-flex align-items-center gap-2">
            <p className="mb-0">Me gusta: {contadorMeGusta.contador}</p>
            <div className="btn-group btn-group-sm" role="group">
              <button
                type="button"
                className="btn btn-primary"
                onClick={contadorMeGusta.incrementar}
              >
                +
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={contadorMeGusta.decrementar}
              >
                -
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={contadorMeGusta.reset}
              >
                Reset
              </button>
            </div>
          </div>

          <div className="d-flex align-items-center gap-2">
            <p className="mb-0">
              Personas a las que les gusta: {contadorPersonas.contador}
            </p>
            <div className="btn-group btn-group-sm" role="group">
              <button
                type="button"
                className="btn btn-primary"
                onClick={contadorPersonas.incrementar}
              >
                +
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={contadorPersonas.decrementar}
              >
                -
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={contadorPersonas.reset}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}
