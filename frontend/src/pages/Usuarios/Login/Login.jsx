import { Link, useNavigate } from "react-router-dom";
import "./Login.css"
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

export const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const {login} = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario: user, contraseña: password }),
      });

      const data = await response.json();

      if (response.ok) {
        //console.log(data.token);
        //localStorage.setItem("token", data.token);
        //userRefresh();
        login(data.token)
        setTimeout(() => {
          navigate("/perfil")
        }, 2000);
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setMensaje("Error en la conexión con el servidor");
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card shadow-lg">
            <div className="card-body">
              <h2 className="text-center mb-4">Iniciar Sesión</h2>
              <form>
                <div className="mb-3">
                  <label className="form-label">Usuario</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Usuario"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary w-100"
                  onClick={handleLogin}
                >
                  Ingresar
                </button>
              </form>
              {mensaje && (
                <p className="mt-3 text-center text-danger">{mensaje}</p>
              )}
              <h3>Registrarse</h3>
              <Link to="/register" className="btn btn-success w-100">
                Registrarse
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/*export const Login = () => {
    const [usuario, setUsuario] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [mensaje, setMensaje] = useState("");
    const { userRefresh, token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token !== "null" || !token || token === null || token === undefined || token === "") {
        navigate("/perfil");
      }
    }, [token,navigate]);

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

            if (!data.token || data.token === "null" || data.token === "undefined" || data.token === "" || data.token === null) {
              console.error("Token inválido:", token);
              return;
            }

            if (response.ok) {
                //userRefresh(data.token,data.usuario)
                localStorage.setItem("token", data.token)
                //setMensaje(`Bienvenido, ${user?.usuario}`)
                //console.log(data)
                userRefresh()
                navigate("/perfil")
                //localStorage.setItem("usuario: ",JSON.stringify(data))
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

        <h3>Registrarse</h3>
        <Link to="/register" className="btn btn-success">Registrarse</Link>
    </div>
    );
}*/