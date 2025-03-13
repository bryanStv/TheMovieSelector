import "./Perfil.css";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetchListUsers } from "../../../apis/useFetchListUsers";
import { useFetchAddFollow } from "../../../apis/follows/useFetchAddFollow";
import { useFetchIsFollowed } from "../../../apis/follows/useFetchIsFollowed";
import { useFetchRemoveFollow } from "../../../apis/follows/useFetchRemoveFollow";
import { useFetchChangePassword } from "../../../apis/users/useFetchChangePassword";
import { useFetchEnviarMensaje } from "../../../apis/notificaciones/useFetchEnviarMensaje";
import { useFetchRecibirMensajes } from "../../../apis/notificaciones/useFetchRecibirMensajes";

export const Perfil = () => {
  const { user, logout, token } = useAuth();
  const { users } = useFetchListUsers();
  const { addFollow } = useFetchAddFollow();
  const { removeFollow } = useFetchRemoveFollow();
  const { checkIfFollowed } = useFetchIsFollowed();
  const { changePassword } = useFetchChangePassword();
  const { enviarMensaje } = useFetchEnviarMensaje();
  const { recibirMensajes, notificaciones } = useFetchRecibirMensajes();
  const [followedUsers, setFollowedUsers] = useState({});
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showEnviarMensajeModal,setshowEnviarMensajeModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordVerify,setNewPasswordVerify] = useState("");
  const [viejaPassword, setViejaPassword] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleChangeUser = (event) => {
    setSelectedUser(event.target.value);
  };

  if (user === null) {
    navigate("/");
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleRecibirMensajes = () => {
    recibirMensajes();

    for (const notificacion of notificaciones) {
      console.log(notificacion.mensaje)
    }
  }

  const handleEnviarMensaje = (otherIdUser, mensaje) => {
    console.log(otherIdUser+" --> "+mensaje+" Token: "+token)
    if( !otherIdUser || !mensaje){
      alert("Debes seleccionar un usuario y escribir un mensaje");
    }

    enviarMensaje(otherIdUser,mensaje,token);
    setshowEnviarMensajeModal(false);
    alert("Mensaje enviado correctamente");
  }

    const handlePasswordChange = (newPassword, viejaPassword) => {
        if (newPassword !== newPasswordVerify) {
          alert("Las nuevas contraseñas no coinciden");
          return;
        }

        if (newPassword === viejaPassword) {
          alert("No puedes usar la misma contraseña");
          return;
        }

        changePassword(user.usuario,viejaPassword, newPassword);
        alert("Contraseña cambiada exitosamente");
        setShowModal(false);
    };

  const checkIfUserIsFollowed = async (idUser, idSeguido) => {
    //console.log(`Comprobando si ${idUser} sigue a ${idSeguido}`);
    const result = await checkIfFollowed(idUser, idSeguido);
    //console.log("Resultado de seguimiento:", result);
    return result;
  };

  const handleFollow = (idUser, idSeguido) => {
    addFollow(idUser, idSeguido);
    setFollowedUsers((prevState) => ({
      ...prevState,
      [idSeguido]: true,
    }));
  };

  const handleUnfollow = (idUser, idSeguido) => {
    removeFollow(idUser, idSeguido);
    setFollowedUsers((prevState) => ({
      ...prevState,
      [idSeguido]: false,
    }));
  };

    const fetchFollowedStatus = async () => {
        const followedStatus = {};
        for (let otheruser of users) {
            const isFollowed = await checkIfUserIsFollowed(user.id, otheruser.id);
            followedStatus[otheruser.id] = isFollowed;
        }
        setFollowedUsers(followedStatus);
    };

  useEffect(() => {
    if (users.length > 0) {
      fetchFollowedStatus();
    }
  }, [user, users]);

  if (!user) {
    return <div>No has iniciado sesión</div>;
  }

  return (
    <div className="container-perfil container-fluid row">
      <h1 className="text-center">Perfil de {user.usuario}</h1>
      <div className="perfil col-2">
        <div className="perfil-info">
          <div className="perfil-info-left d-flex justify-content-center align-items-center">
            <img
              src="https://picsum.photos/200"
              alt="Foto de perfil"
              className="perfil-foto img-fluid rounded-circle"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
          </div>
          <div className="perfil-info-right">
            <p>
              <strong>Usuario</strong>
              <br />
              {user.usuario}
            </p>
            <p>
              <strong>Correo</strong>
              <br />
              {user.email}
            </p>
          </div>
        </div>
        <div
          className="botones-usuario"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <button
            className="btn btn-primary btn-sm mt-3"
            onClick={() => handleRecibirMensajes()}
          >
            Mensajes
          </button>
          <button
            className="btn btn-success btn-sm"
            onClick={() => setshowEnviarMensajeModal(true)}
          >
            Enviar mensaje
          </button>
          <button
            className="btn btn-warning btn-sm mt-0"
            onClick={() => setShowModal(true)}
          >
            Cambiar contraseña
          </button>
          <button
            className="btn-logout btn btn-sm btn-danger"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </div>

        {showModal && (
          <div
            className="modal fade show"
            style={{ display: "block" }}
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Cambiar Contraseña
                  </h5>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Contraseña actual</label>
                    <input
                      type="password"
                      className="form-control"
                      id="viejaPassword"
                      value={viejaPassword}
                      onChange={(e) => setViejaPassword(e.target.value)}
                      placeholder="Contraseña actual"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="newPassword">Nueva Contraseña</label>
                    <input
                      type="password"
                      className="form-control"
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Introduce nueva contraseña"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="newPasswordVerify">
                      Confirmar Contraseña
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="newPasswordVerify"
                      value={newPasswordVerify}
                      onChange={(e) => setNewPasswordVerify(e.target.value)}
                      placeholder="Confirmar nueva contraseña"
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() =>
                      handlePasswordChange(newPassword, viejaPassword)
                    }
                  >
                    Guardar cambios
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div
        className="perfil-otros-usuario col-10"
        style={{ maxHeight: "600px", overflowY: "auto" }}
      >
        <div>
          <table
            id="DataTableUsuarios"
            className="table table-striped"
            style={{ width: "100%" }}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Email</th>
                <th>Fecha de registro</th>
                <th>Seguimiento</th>
              </tr>
            </thead>
            <tbody>
              {users.map((otheruser, index) => (
                <tr key={index}>
                  <td>{otheruser.id}</td>
                  <td>{otheruser.usuario}</td>
                  <th>{otheruser.email}</th>
                  <td>{otheruser.fecha_registro}</td>
                  <td>
                    <button
                      className={`btn ${
                        followedUsers[otheruser.id]
                          ? "btn-danger"
                          : "btn-success"
                      }`}
                      onClick={() =>
                        followedUsers[otheruser.id]
                          ? handleUnfollow(user.id, otheruser.id)
                          : handleFollow(user.id, otheruser.id)
                      }
                    >
                      {followedUsers[otheruser.id]
                        ? "Dejar de seguir"
                        : "Seguir"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Email</th>
                <th>Fecha de registro</th>
                <th>Seguimiento</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Modal enviar mensajes */}
      {showEnviarMensajeModal && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="ModalEnviarMensajes"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="ModalEnviarMensajes">
                  Enviar mensaje
                </h5>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="usuario">Seleccionar Usuario</label>
                  <select
                    id="usuario"
                    className="form-control"
                    value={selectedUser}
                    onChange={handleChangeUser}
                  >
                    <option value="">Selecciona un usuario</option>
                    {users.map((otheruser, index) => (
                      <option key={index} value={otheruser.id}>
                        {otheruser.usuario} (ID: {otheruser.id})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="mensaje">Mensaje</label>
                  <textarea
                    className="form-control"
                    id="mensaje"
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    placeholder="Escribe tu mensaje"
                    rows={4}
                    style={{ resize: "none" }}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setshowEnviarMensajeModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleEnviarMensaje(selectedUser, mensaje)}
                >
                  Guardar cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
