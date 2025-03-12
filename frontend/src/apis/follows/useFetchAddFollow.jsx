import { useState } from "react";

export const useFetchAddFollow = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState(null);

  const addFollow = async (idUser, idSeguido) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/add-follow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario_id: idUser, seguido_id: idSeguido }),
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje("Seguimiento realizado exitosamente.");
      } else {
        setMensaje(data.message);
      }
    } catch (error) {
      setError("Error al realizar el seguimiento");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { addFollow, loading, error, mensaje };
};
