import "./Populares.css"

import { FormattedMessage } from "react-intl";
import { CardPelis } from "../../components/ui/Elementos/Cards/CardPelis";
import { useFetchTMDB } from "../../apis/useFetchTMDB";
import { ButtonsPagination } from "../../components/ui/Elementos/Buttons/ButtonsPaginacion";

export const Populares = () => {
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    const {
      movies,
      pagina,
      totalPaginas,
      paginacionFetchSig,
      paginacionFetchAnt,
    } = useFetchTMDB(
      API_KEY,
      "https://api.themoviedb.org/3/movie/popular"
    );

    return (
      <div className="container mt-5">
        <h1 className="text-center">
          <FormattedMessage
            id="message.Popular-title"
            defaultMessage="Películas Populares"
          />
        </h1>
        <br />
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
}