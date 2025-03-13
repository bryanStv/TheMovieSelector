import { useState } from "react";

export const useFetchChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState(null);

  const changePassword = async (usuario, oldPassword, newPassword) => {
    setLoading(true);

    oldPassword = oldPassword.trim();
    
    try {
      const response = await fetch(
        "http://localhost:3000/api/change-password",
        {
          method: "PATCH",
          headers: {
            //Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ usuario, oldPassword, newPassword }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMensaje("Contraseña cambiada con éxito.");
      } else {
        setMensaje(data.message);
      }
    } catch (error) {
      setError("Error al cambiar la contraseña");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { changePassword, loading, error, mensaje };
};
