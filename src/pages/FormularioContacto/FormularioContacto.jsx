import "./FormularioContacto.css";

import { useState, useRef, useEffect } from "react";
import { FormattedMessage } from "react-intl";

export const FormularioContacto = () => {
    const [email, setEmail] = useState("");
    const [contraseña, setContraseña] = useState("");

    const [datos,setDatos] = useState("");
    const inputDato = useRef()

    /*const mostrarInformacion = (e) => {
        e.preventDefault();

        setDatos(email + " " + contraseña);
    }*/

    useEffect(() => {
      inputDato.current.focus();
    },[]);

    useEffect(() => {
      setDatos(`${email} ${contraseña}`);
    },[email, contraseña]);

    return (
      <>
        <h1>
          <FormattedMessage
            id="message.formulario-contacto-title"
            defaultMessage="Formulario de Contacto"
          />
        </h1>
        {/*</><form onSubmit={mostrarInformacion}>*/}
        <form>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              <FormattedMessage
                id="message.formulario-contacto-email"
                defaultMessage="Correo electrónico"
              />
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div id="emailHelp" className="form-text">
              <FormattedMessage
                id="message.formulario-contacto-email-help"
                defaultMessage="Nunca compartiremos tu correo electrónico con nadie."
              />
            </div>
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              <FormattedMessage
                id="message.formulario-contacto-password"
                defaultMessage="Contraseña"
              />
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label
              className="form-check-label"
              for="exampleCheck1"
              ref={inputDato}
            >
              <FormattedMessage
                id="message.formulario-contacto-conditions"
                defaultMessage="Aceptar condiciones de uso"
              />
            </label>
          </div>
          {/*<button type="submit" className="btn btn-primary">
            Submit
          </button>*/}
        </form>

        <div className="alert alert-primary" role="alert">
          <h2>{datos}</h2>
        </div>
      </>
    );
}