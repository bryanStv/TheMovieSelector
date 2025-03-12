import "./Perfil.css"
import { useAuth } from "../../../context/AuthContext";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchListUsers } from "../../../apis/useFetchListUsers";

export const Perfil = () => {
  const { user, logout } = useAuth();
  const { users } = useFetchListUsers();

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
      <div
        className="perfil-otros-usuario col"
        style={{ maxHeight: "300px", overflowY: "auto" }}
      >
        <h1>Usuarios</h1>
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              <p>ID: {user.id}</p>
              <p>Usuario: {user.usuario}</p>
              <p>Email: {user.email}</p>
              <p>Fecha de registro: {user.fecha_registro}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};