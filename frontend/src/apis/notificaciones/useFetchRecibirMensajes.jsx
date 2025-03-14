import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export const useFetchRecibirMensajes = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [notificaciones, setNotificaciones] = useState([]);
    const { token } = useAuth();

    useEffect (() => {
        //console.log("Notificaciones actualizadas: ", notificaciones);
    },[notificaciones])

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

        setNotificaciones(procesarNotificaciones(data.notificaciones))

        if (response.ok) {
        setMessage("Mensaje enviado con exito.");
        } else {
        console.log("Error 1");
        setMessage(data.message);
        }
    } catch (error) {
        setError("Error al enviar el mensaje");
        console.log("Error 2");
        console.error(error);
    } finally {
        setLoading(false);
    }
    };

    return { recibirMensajes, notificaciones, loading, error, message };
}

class Notificacion {
  constructor(emisor_id,nombre_emisor, mensaje, fecha, estado) {
    this.emisor_id = emisor_id;
    this.nombre_emisor = nombre_emisor;
    this.mensaje = mensaje;
    this.fecha = fecha;
    this.estado = estado;
  }
}

const procesarNotificaciones = (jsonData) => {
    if (!Array.isArray(jsonData)) {
        throw new Error(
        "El formato de datos no es válido, se esperaba un array."
        );
    }

    const notificaciones = jsonData.map(
    (item) =>
        new Notificacion(
        item.emisor_id,
        item.nombre_emisor,
        item.mensaje,
        item.fecha,
        item.estado
        )
    );

    return notificaciones;
};