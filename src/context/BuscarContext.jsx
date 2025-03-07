import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIntl } from "react-intl";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BuscarContext = createContext();

export const BuscarProvider = ({ children }) => {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const navigate = useNavigate();
    const { formatMessage } = useIntl();
    const [idioma, setIdioma] = useState("es-ES");

    useEffect(() => {
    setIdioma(
        formatMessage({
        id: "message.API-movies-lan",
        defaultMessage: "es-ES",
        })
    );
    }, [formatMessage]);

    const fetchPeliculaByTitulo = async () => {
        if (!query.trim()) return;
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

            navigate("/resultados", {
                replace: true,
                state: {
                movies: data.results,
                totalPaginas: data.total_pages,
                pagina: pagina,
                query: query,
                idioma: idioma,
                },
            });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const timer = setTimeout(fetchPeliculaByTitulo, 100);
        return () => clearTimeout(timer);
    }, [query, pagina]);


    return (
    <BuscarContext.Provider
        value={{
        query,
        setQuery,
        movies,
        setMovies,
        pagina,
        setPagina,
        totalPaginas,
        setTotalPaginas,
        }}
    >
        {children}
    </BuscarContext.Provider>
    );
};

export const useBuscarContext = () => useContext(BuscarContext);
