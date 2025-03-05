import placeholderMovieCover from "../../../../assets/placeholderPoster.jpg"

export const CardPelis = ({
  movie,
  gotoPeli,
  esFavorita,
  addFavoritas,
  eliminarFavoritas,
}) => {
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
            Fecha de lanzamiento: {movie.release_date}
          </p>
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
  );
};
