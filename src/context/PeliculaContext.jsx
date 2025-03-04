import React, { createContext, useState, useContext, useEffect } from "react";

const PeliculaContext = createContext()

export const PeliculaProvider = ({ children }) => {
    //const [pelicula, setPelicula] = useState([])




    return(
        <PeliculaContext.Provider 
        value={{

        }}
        >
            {children}
        </PeliculaContext.Provider>
    )
}