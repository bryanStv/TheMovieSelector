import { useState } from "react";

export const useFetchEnviarMensaje = () => {
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);
      const [message, setMessage] = useState(null);
    
      const enviarMensaje = async (Idreceptor, mensaje, token) => {
        setLoading(true);

        Idreceptor = parseInt(Idreceptor);

        try {
          const response = await fetch(
            "http://localhost:3000/api/send-message",
            {
              method: "POST",
              headers: {
                Authorization: token,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ receptor_id:Idreceptor, mensaje }),
            }
          );

          const data = await response.json();
          console.log("Datos del fetch mensaje: "+JSON.stringify(data))

          if (response.ok) {
            setMessage("Mensaje enviado con exito.");
          } else {
            console.log("Error 1")
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
    
      return { enviarMensaje, loading, error, message };
}