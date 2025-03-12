import { useState } from "react";

export const useFetchIsFollowed = () => {
  const [isFollowed, setIsFollowed] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkIfFollowed = async (usuarioId, seguidoId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/is-followed?usuario_id=${usuarioId}&seguido_id=${seguidoId}`
      );
      const data = await response.json();

      if (response.ok) {
        setIsFollowed(data.isFollowed);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { isFollowed, loading, error, checkIfFollowed };
};
