import { useEffect, useState } from "react";

export const useFetchTMDB = (API_KEY, url, region = null) => {
  const [movies, setMovies] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(0);

  const getMovies = async (url,region) => {
    try {
      const regionParametro = region ? `&region=${region}` : "";
      const response = await fetch(
        //`https://api.themoviedb.org/3/movie/popular?language=es-ES&page=${pagina}&api_key=${API_KEY}` populares
        //`https://api.themoviedb.org/3/movie/now_playing?language=es-ES&region=ES&page=${pagina}&api_key=${API_KEY}` cartelera
        `${url}?language=es-ES&page=${pagina}&api_key=${API_KEY}${regionParametro}`
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
    getMovies(url,region);
  }, [pagina]);

  return {
    movies,
    pagina,
    totalPaginas,
    paginacionFetchSig,
    paginacionFetchAnt,
  };
};