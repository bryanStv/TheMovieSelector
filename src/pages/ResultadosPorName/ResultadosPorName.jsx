import "./ResultadosPorName.css"
import { useLocation } from "react-router-dom";
import { CardPelis } from "../../components/ui/Elementos/Cards/CardPelis";
import { useBuscarContext } from "../../context/BuscarContext";
import { ButtonsPagination } from "../../components/ui/Elementos/Buttons/ButtonsPaginacion";
//import { useSearchFetchTMDB } from "../../apis/useSearchFetchTMDB";
import { FormattedMessage } from "react-intl";

export const ResultadosPorName = () => {
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const location = useLocation()
  const movies = location.state?.movies || [];
  const { pagina,totalPaginas,paginacionFetchAnt,paginacionFetchSig } = useBuscarContext();


  return (
    <div className="container mt-5">
      <h1 className="text-center">
        <FormattedMessage 
        id="message.results-search-title" 
        defaultMessage="Resultados de búsqueda" />
      </h1>
      {/*{console.log(movies)}*/}
      {movies.map((movie) => (
        <CardPelis
          key={movie.id}
          movie={movie}
        />
      ))}

      <ButtonsPagination
        pagina={pagina}
        totalPaginas={totalPaginas}
        paginacionFetchSig={paginacionFetchSig}
        paginacionFetchAnt={paginacionFetchAnt}
      />
    </div>
  );
};