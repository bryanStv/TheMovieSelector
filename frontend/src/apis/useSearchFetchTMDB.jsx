import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIntl } from "react-intl";

export const useSearchFetchTMDB = (API_KEY,query) => {
    const [movies, setMovies] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [idioma,setIdioma] = useState("es-ES");
    const { formatMessage } = useIntl();
    const navigate = useNavigate();

    useEffect(() => {
    setIdioma(
        formatMessage({
        id: "message.API-movies-lan",
        defaultMessage: "es-ES",
        })
    );
    }, [formatMessage]);

    const fetchPeliculaByTitulo = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${query}&language=${idioma}&page=${pagina}&api_key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Error obteniendo películas");
        }
        const data = await response.json();
        setMovies(data.results);
        setTotalPaginas(data.total_pages);

        return data;
      } catch (error) {
        console.error(error);
        return null;
      }
    };

    const paginacionFetchSig = () => {
    if (pagina < totalPaginas) {
        setPagina(pagina + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    };

    const paginacionFetchAnt = () => {
    if (pagina > 1) {
        setPagina(pagina - 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    };

    useEffect(() => {
        console.info("ENTRA AL USEEFFECT DE LA API con query", pagina, query);

        const timer = setTimeout(() => {
        if (query.trim() === "") return;
        fetchPeliculaByTitulo();
        }, 2000);

        return () => clearTimeout(timer);
    }, [query]);

    useEffect(() => {
        console.info("ENTRA AL USEEFFECT DE LA API sin query", pagina, query);
        if (query.trim() === "") return;
        fetchPeliculaByTitulo()
    }, [pagina, idioma]);

    const handleBuscarPeli = async (e) => {
        e.preventDefault();
        if (query.trim() === "") return;
        navigate("/resultados",{state: {
            movies:movies,
            totalPaginas:totalPaginas,
            pagina:pagina,
            query:query,
            idioma:idioma,
        }})
    };

    return { movies, query, totalPaginas, pagina, handleBuscarPeli, paginacionFetchAnt, paginacionFetchSig };
}