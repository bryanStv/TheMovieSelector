const getAuthorization = async (token) => {
    console.log("Token recibido en getAuthoritation: "+token)
  try {
    const response = await fetch("http://localhost:3000/api/getUserByToken", {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    const usuario = data.data;

    //console.log("Usuario obtenido: ", usuario);

    return usuario;
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    throw new Error("Error interno del servidor");
  }
};

module.exports = { getAuthorization };
