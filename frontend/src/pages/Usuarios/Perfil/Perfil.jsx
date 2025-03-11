import "./Perfil.css"
import { useAuth } from "../../../context/AuthContext";
//import { useState,useEffect } from "react";

export const Perfil = () => {
    const { user } = useAuth();
    //const [loading, setLoading] = useState(true);

    if (!user) {
        return <p>Cargando perfil...</p>;
    }

    /*useEffect(() => {
      const loadUserData = async () => {
        await userRefresh();
        setLoading(false);
      };

      loadUserData();
    }, [userRefresh]);

    if (loading) {
      return <p>Cargando perfil...</p>; // Mientras cargamos los datos
    }*/

    return (
        <div className="container-perfil">
            <div className="perfil">
                <h1>Perfil</h1>
                <div className="perfil-info">
                    <div className="perfil-info-left">
                        {user.usuario}
                    </div>
                    <div className="perfil-info-right">
                        <p>Correo: {user.email}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}