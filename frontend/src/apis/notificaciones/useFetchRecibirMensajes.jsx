import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export const useFetchRecibirMensajes = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [notificaciones, setNotificaciones] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    //console.log("Notificaciones actualizadas: ", notificaciones);
  }, [notificaciones]);

  const recibirMensajes = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3000/api/receive-messages",
        {
          method: "GET",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      setNotificaciones(procesarNotificaciones(data.notificaciones));

      if (response.ok) {
        setMessage("Mensaje recibido con éxito.");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setError("Error al recibir mensajes");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const cambiarEstadoNotificacion = async (id, estadoActual) => {
    const nuevoEstado = estadoActual === "leído" ? "no leído" : "leído";

    try {
      const response = await fetch(
        `http://localhost:3000/api/notifications/status/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            estado: nuevoEstado,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Actualiza el estado de la notificación en el estado local
        setNotificaciones((prevNotificaciones) =>
          prevNotificaciones.map((notificacion) =>
            notificacion.id === id
              ? { ...notificacion, estado: nuevoEstado }
              : notificacion
          )
        );
        setMessage("Estado de la notificación actualizado");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error al cambiar el estado:", error);
      setMessage("Error al cambiar el estado");
    }
  };

  return {
    recibirMensajes,
    notificaciones,
    loading,
    error,
    message,
    cambiarEstadoNotificacion,
  };
};

class Notificacion {
  constructor(id, emisor_id, nombre_emisor, mensaje, fecha, estado) {
    this.id = id;
    this.emisor_id = emisor_id;
    this.nombre_emisor = nombre_emisor;
    this.mensaje = mensaje;
    this.fecha = fecha;
    this.estado = estado;
  }
}

const procesarNotificaciones = (jsonData) => {
  if (!Array.isArray(jsonData)) {
    throw new Error("El formato de datos no es válido, se esperaba un array.");
  }

  const notificaciones = jsonData.map(
    (item) =>
      new Notificacion(
        item.id,
        item.emisor_id,
        item.nombre_emisor,
        item.mensaje,
        item.fecha,
        item.estado
      )
  );

  return notificaciones;
};
