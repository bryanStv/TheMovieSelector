import "./ResultadosPorName.css"
import { useLocation } from "react-router-dom";
import { CardPelis } from "../../components/ui/Elementos/Cards/CardPelis";
//import { ButtonsPagination } from "../../components/ui/Elementos/Buttons/ButtonsPaginacion";
//import { useSearchFetchTMDB } from "../../apis/useSearchFetchTMDB";

export const ResultadosPorName = () => {
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const location = useLocation()
  const movies = location.state?.movies || [];
  //const { pagina,totalPaginas,paginacionFetchAnt,paginacionFetchSig } = useSearchFetchTMDB(API_KEY);


  return (
    <div className="container mt-5">
      <h1 className="text-center">Resultados de búsqueda</h1>
      {/*{console.log(movies)}*/}
      {movies.map((movie) => (
        <CardPelis
          key={movie.id}
          movie={movie}
        />
      ))}

      {/*<ButtonsPagination
        pagina={pagina}
        totalPaginas={totalPaginas}
        paginacionFetchSig={paginacionFetchSig}
        paginacionFetchAnt={paginacionFetchAnt}
      />*/}
    </div>
  );
};