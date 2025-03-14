import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export const useFetchNoLeidas = () => {
  const [noLeidas, setNoLeidas] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    const intervalo = setInterval(async () => {
      const hayNoLeidas = await comprobarNotificacionesNoLeidas();
      setNoLeidas(hayNoLeidas);
      console.log("No leídas -->", hayNoLeidas);
    }, 20000);

    return () => clearInterval(intervalo);
  }, []);

  const comprobarNotificacionesNoLeidas = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/notifications/unread",
        {
          method: "GET",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      return data.tieneNoLeidos;
    } catch (error) {
      console.error("Error al comprobar las notificaciones no leídas:", error);
      return false;
    }
  };

  return { noLeidas };
};
