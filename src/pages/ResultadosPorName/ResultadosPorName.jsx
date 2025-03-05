import "./ResultadosPorName.css"
import { useLocation, useNavigate } from "react-router-dom";
import { useFavoritas } from "../../context/FavoritasContext";
import { CardPelis } from "../../components/ui/Elementos/Cards/CardPelis";

export const ResultadosPorName = () => {
  const location = useLocation()
  const { movies } = location.state || { results: [] }

  const { addFavoritas,esFavorita, eliminarFavoritas } = useFavoritas()
  const navigate = useNavigate()

  /*const handleAddToFavoritas = (movie) => {
    addFavoritas(movie)
  };

  const handleRemoveFavoritas = (id) => {
    eliminarFavoritas(id)
  }*/

  const gotoPeli = (movie) => {
    navigate("/pelicula", { state: { movie } });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Resultados de búsqueda</h1>
      {movies.map((movie) => (
        <CardPelis
          key={movie.id}
          movie={movie}
          gotoPeli={gotoPeli}
          esFavorita={esFavorita}
          addFavoritas={addFavoritas}
          eliminarFavoritas={eliminarFavoritas}
        />
      ))}
    </div>
  );
};


{/*<div
  className="btn-group"
  role="group"
  aria-label="grupoBotonesPaginacion"
>
  <button
    type="button"
    className="btn btn-primary"
    onClick={paginacionFetchAnt}
    disabled={pagina <= 1}
  >
    Anterior
  </button>

  <button
    type="button"
    className="btn btn-primary"
    onClick={paginacionFetchSig}
    disabled={pagina >= totalPaginas}
  >
    Siguiente
  </button>
</div>
*/}

{/*
fetch('https://api.themoviedb.org/3/movie/now_playing?language=es-ES&page=1&region=ES', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));

*/}