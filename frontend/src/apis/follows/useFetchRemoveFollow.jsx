import { useState } from "react";

export const useFetchRemoveFollow = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState(null);

  const removeFollow = async (idUser, idSeguido) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/remove-follow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario_id: idUser, seguido_id: idSeguido }),
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje("Seguimiento eliminado exitosamente.");
      } else {
        setMensaje(data.message);
      }
    } catch (error) {
      setError("Error al eliminar el seguimiento");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { removeFollow, loading, error, mensaje };
};
