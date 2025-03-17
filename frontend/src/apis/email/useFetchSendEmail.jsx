import { useState } from "react";

const useFetchSendEmail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const sendEmail = async (token) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(
        "http://localhost:3000/api/mail/recoverPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ sandboxMode: true }), //el true no envia correo
        }
      );

      const data = await response.json();
      console.info(data)

      if (!response.ok) {
        throw new Error(data.message || "Error al enviar el correo");
      }

      setSuccess(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendEmail, loading, error, success };
};

export default useFetchSendEmail;