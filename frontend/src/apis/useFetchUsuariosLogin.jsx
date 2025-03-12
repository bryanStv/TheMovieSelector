import { useState } from "react";

export const useFetchUsuariosLogin = () => {
    const [usuario, setUsuario] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [mensaje, setMensaje] = useState("");

    const handleLogin = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ usuario, contraseña }),
            });

            const data = await response.json();

            if (response.ok) {
                setMensaje(`Bienvenido, ${data.usuario}`);
                //localStorage.setItem("token", data.token);
            } else {
                setMensaje(data.message);
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            setMensaje("Error en la conexión con el servidor");
        }
    };

    return (
    <div>
        <h2>Iniciar Sesión</h2>
        <input
        type="text"
        placeholder="Usuario"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
        />
        <input
        type="password"
        placeholder="Contraseña"
        value={contraseña}
        onChange={(e) => setContraseña(e.target.value)}
        />
        <button onClick={handleLogin}>Ingresar</button>
        <p>{mensaje}</p>
    </div>
    );

}