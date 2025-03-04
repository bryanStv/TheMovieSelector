import React, { createContext, useState, useContext, useEffect } from 'react';

const PelisFavoritasContext = createContext()

export const PelisFavoritasProvider = ({ children }) => {
  const [favoritas, setFavoritas] = useState([]);

  useEffect(() => {
    console.log("Favoritas actualizadas:", favoritas);
  }, [favoritas]);

  const addFavoritas = (movie) => {
    if(!esFavorita(movie.id)){
        setFavoritas([...favoritas, movie])
    }
  }

  const eliminarFavoritas = (id) => {
    if(esFavorita(id)){
        setFavoritas(favoritas.filter((movie) => movie.id !== id))
    }
  }

  const esFavorita = (id) => {
    return favoritas.some((movie) => movie.id === id)
  }

  return (
    <PelisFavoritasContext.Provider
      value={{
        favoritas,
        addFavoritas,
        eliminarFavoritas,
        esFavorita,
      }}
    >
      {children}
    </PelisFavoritasContext.Provider>
  )
};

export const useFavoritas = () => useContext(PelisFavoritasContext)
