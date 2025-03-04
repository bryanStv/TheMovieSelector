import "./FormularioContacto.css";

import { useState } from "react";

export const FormularioContacto = () => {
    const [email, setEmail] = useState("");
    const [contraseña, setContraseña] = useState("");

    const [datos,setDatos] = useState("");

    const mostrarInformacion = (e) => {
        e.preventDefault();

        setDatos(email + " " + contraseña);
    }

    return (
      <>
        <h1>Formulario de Contacto</h1>
        <form onSubmit={mostrarInformacion}>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value = {email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div id="emailHelp" className="form-text">
              Nunca compartiremos tu correo electrónico con nadie.
            </div>
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value = {contraseña}
              onChange={(e) => setContraseña(e.target.value)}
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" for="exampleCheck1">
              Aceptar condiciones
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>

        <div className="alert alert-primary" role="alert">
          <h2>{datos}</h2>
        </div>
      </>
    );
}