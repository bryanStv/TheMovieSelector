import "./Favoritas.css"

export const Favoritas = ({ favorites }) => {
    return (
        <div id="favoritas">
            <h1>Peliculas favoritas</h1>
            <div className="favoritas-lista">
                {favorites.map((movie) => (
                    <div key={movie.id} className="favorita-item">
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                    </div>
                ))}
            </div>
        </div>
    )
}
