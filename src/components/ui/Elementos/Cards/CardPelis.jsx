import placeholderMovieCover from "../../../../assets/placeholderPoster.jpg"
import { useNavigate } from "react-router-dom";
import { useFavoritas } from "../../../../context/FavoritasContext.jsx";
import { FormattedMessage } from "react-intl";

const generosList = {
  28: "Acción",
  12: "Aventura",
  16: "Animación",
  35: "Comedia",
  80: "Crimen",
  99: "Documental",
  18: "Drama",
  10751: "Familia",
  14: "Fantasía",
  36: "Historia",
  27: "Terror",
  10402: "Música",
  9648: "Misterio",
  10749: "Romance",
  878: "Ciencia ficción",
  10770: "Película de TV",
  53: "Suspense",
  10752: "Bélica",
  37: "Western",
};

export const CardPelis = ({
  movie,
  //esFavorita,
  //addFavoritas,
  //eliminarFavoritas,
}) => {
  const navigate = useNavigate();
  const { addFavoritas,esFavorita, eliminarFavoritas } = useFavoritas()
  
  const gotoPeli = (movie) => {
    navigate("/pelicula", { state: { movie } });
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="text-center">{movie.title}</h2>
      </div>
      <div className="card-body row">
        <img
          className="col-md-2"
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : placeholderMovieCover
          }
          alt={movie.title}
          style={{
            width: "10em",
            maxHeight: "15em",
            objectFit: "cover",
          }}
        />
        <div className="col-md-10">
          <p className="card-text">{movie.overview}</p>
          <p className="card-text">
            <strong>
              <FormattedMessage
                id="message.CardMovies-launchDate"
                defaultMessage="Fecha de lanzamiento:"
              />
            </strong>
            {movie.release_date}
          </p>
          <span>
            <strong>
              <FormattedMessage
                id="message.CardMovies-genres"
                defaultMessage="Generos:"
              />
            </strong>
          </span>
          {movie.genre_ids.map((genero) => (
            <span key={genero} className="card-text">
              {generosList[genero]}{" "}
            </span>
          ))}
        </div>
      </div>
      <div className="card-footer d-flex justify-content-center">
        <div
          className="btn-group"
          role="group"
          aria-label="grupoBotonesPeliculas"
        >
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => gotoPeli(movie)}
          >
            <FormattedMessage
              id="message.CardMovies-details"
              defaultMessage="Detalles"
            />
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
              <FormattedMessage
                id="message.CardMovies-addFavorites"
                defaultMessage="Añadir a favoritas"
              />
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => eliminarFavoritas(movie.id)}
            >
              <FormattedMessage
                id="message.CardMovies-removeFavorites"
                defaultMessage="Eliminar de favoritas"
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
