import { useState } from "react";

const useFetchVerifyCode = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const verifyCode = async (code, token) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(
        "http://localhost:3000/api/mail/verifyCode",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ code }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al verificar el código");
      }

    if (data.success) {
        setSuccess(true);
    } else {
        setSuccess(false);
        setError("Código incorrecto o expirado.");
    }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { verifyCode, loading, error, success };
};

export default useFetchVerifyCode;