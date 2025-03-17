import "./Register.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const [usuario, setUsuario] = useState("");
    const [email, setEmail] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [mensaje, setMensaje] = useState("");
    const navigate = useNavigate();

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
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } else {
            setMensaje(data.message);
        }
        } catch (error) {
        console.error("Error al crear usuario:", error);
        setMensaje("Error en la conexión con el servidor");
        }
    };

      return (
        <div className="container mt-4">
          <div className="row justify-content-center">
            <div className="col-md-5">
              <div className="card shadow-lg">
                <div className="card-body">
                  <h2 className="text-center mb-4">Registrarse</h2>
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Usuario</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Usuario"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Correo electrónico</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Contraseña</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Contraseña"
                        value={contraseña}
                        onChange={(e) => setContraseña(e.target.value)}
                      />
                    </div>
                    <button
                      type="button"
                      className="btn btn-success w-100"
                      onClick={handleRegister}
                    >
                      Registrarse
                    </button>
                  </form>
                  {mensaje && (
                    <p className="mt-3 text-center text-info">{mensaje}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}

    {
      /*return (
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
    );*/
    }