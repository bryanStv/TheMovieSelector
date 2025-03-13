import "./Perfil.css";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetchListUsers } from "../../../apis/useFetchListUsers";
import { useFetchAddFollow } from "../../../apis/follows/useFetchAddFollow";
import { useFetchIsFollowed } from "../../../apis/follows/useFetchIsFollowed";
import { useFetchRemoveFollow } from "../../../apis/follows/useFetchRemoveFollow";
import { useFetchChangePassword } from "../../../apis/users/useFetchChangePassword";

export const Perfil = () => {
  const { user, logout } = useAuth();
  const { users } = useFetchListUsers();
  const { addFollow } = useFetchAddFollow();
  const { removeFollow } = useFetchRemoveFollow();
  const { checkIfFollowed } = useFetchIsFollowed();
  const { changePassword } = useFetchChangePassword();
  const [followedUsers, setFollowedUsers] = useState({});
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordVerify,setNewPasswordVerify] = useState("");
  const [viejaPassword, setViejaPassword] = useState("");

  if (user === null) {
    navigate("/");
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

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
          <div className="perfil-info-left">
            <img
              src="https://picsum.photos/200"
              alt="Foto de perfil"
              className="perfil-foto img-fluid rounded-circle"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
            <p>
              <strong>Usuario</strong>
              <br />
              {user.usuario}
            </p>
          </div>
          <div className="perfil-info-right">
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
            className="btn btn-success btn-sm mt-3" 
            onClick={() => setShowModal(true)}> 
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
        style={{ maxHeight: "300px", overflowY: "auto" }}
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
    </div>
  );
};
