import "./Register.css"
import { useState } from "react";

export const Register = () => {
    const [usuario, setUsuario] = useState("");
    const [email, setEmail] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [mensaje, setMensaje] = useState("");

    const handleRegister = async () => {
        try {
        const response = await fetch("http://localhost:3000/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ usuario, contraseña, email }),
        });

        const data = await response.json();

        if (response.ok) {
            //console.info(JSON.stringify(data))
            setMensaje(`Bienvenido, ${data.usuario}`);
            localStorage.setItem("Datos", JSON.stringify(data));
            localStorage.setItem("token", data.token);
        } else {
            setMensaje(data.message);
        }
        } catch (error) {
        console.error("Error al crear usuario:", error);
        setMensaje("Error en la conexión con el servidor");
        }
    };

    return (
        <div>
        <h2>Registrarse</h2>
        <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
        />
        <input
            type="email"
            placeholder="Correo electrónico" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
        <input
            type="password"
            placeholder="Contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
        />
        <button onClick={handleRegister}>Ingresar</button>
        <p>{mensaje}</p>
        </div>
    );
}