import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";

export const useSearchFetchTMDB = (API_KEY,query,pagina = 1) => {
    //const [buscarPeli, setBuscarPeli] = useState("");
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    //const [pagina, setPagina] = useState(1);
    //const [totalPaginas, setTotalPaginas] = useState(0);

    const fetchPeliculaByTitulo = async () => {
    const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&language=es-ES&page=${pagina}&api_key=${API_KEY}`
    );
    const data = await response.json();
    setMovies(data);
    //return data.results;
    return data;
    };

    const handleBuscarPeli = async (e) => {
    e.preventDefault();

    if (query.trim() === "") return;

    //const movies = await fetchPeliculaByTitulo(query);

    /*if(movies){
        setTotalPaginas(movies.total_pages);
    }*/

    //navigate("/resultados", { state: { movies: movies.results, totalPaginas: totalPaginas } });
    navigate("/resultados", {state: { movies: movies.results}});
    };

    useEffect(() => {
       fetchPeliculaByTitulo();
    }, [query, pagina]);

    return {
      movies,
      handleBuscarPeli,
    };
}