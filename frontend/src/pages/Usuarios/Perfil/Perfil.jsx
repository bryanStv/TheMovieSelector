import "./Perfil.css"
import { useAuth } from "../../../context/AuthContext";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Perfil = () => {
  const { user, logout } = useAuth(); // Accedemos al contexto de autenticación

  if (!user) {
    return <div>No has iniciado sesión</div>;
  }

  return (
      <div className="container-perfil container-fluid row">
        <div className="perfil col">
          <h1>Perfil</h1>
          <div className="perfil-info">
            <div className="perfil-info-left">Usuario: {user.usuario}</div>
            <div className="perfil-info-right">
              <p>Correo: {user.email}</p>
            </div>
          </div>
          <div>
            <button className="btn-logout" onClick={logout}>
              Cerrar sesión
            </button>
          </div>
        </div>
        {/*<div className="perfil-otros-usuario col">
          <h1>Usuarios</h1>
          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.nombre}</li>
            ))}
          </ul>
        </div>*/}
      </div>
    );
};