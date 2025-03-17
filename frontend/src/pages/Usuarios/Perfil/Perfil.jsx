import "./Perfil.css";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserButtons from "../../../components/ui/Elementos/Buttons/Usuarios/Perfil/UserButtons";
import ChangePasswordModal from "../../../components/ui/Elementos/Modals/Usuarios/Perfil/ChangePasswordModal";
import EnviarMensajeModal from "../../../components/ui/Elementos/Modals/Usuarios/Perfil/EnviarMensajeModal";
import MensajesRecibidosModal from "../../../components/ui/Elementos/Modals/Usuarios/Perfil/MensajesRecibidosModal";
import { UserTable } from "../../../components/ui/Elementos/DataTables/Usuarios/Perfil/UserTable";
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
  const { recibirMensajes, notificaciones, cambiarEstadoNotificacion } = useFetchRecibirMensajes();
  const [followedUsers, setFollowedUsers] = useState({});
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showCodigo, setShowCodigo] = useState(false);
  const [showEnviarMensajeModal, setshowEnviarMensajeModal] = useState(false);
  const [showRecibidosModal, setShowRecibidosModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordVerify, setNewPasswordVerify] = useState("");
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

    setShowRecibidosModal(true);
  };

  const handleEnviarMensaje = (otherIdUser, mensaje) => {
    if (!otherIdUser || !mensaje) {
      toast.error("Debes seleccionar un usuario y escribir un mensaje");
      return;
    }

    enviarMensaje(otherIdUser, mensaje, token);
    setshowEnviarMensajeModal(false);
    toast.success("Mensaje enviado correctamente");
  };

  const handlePasswordChange = (newPassword, viejaPassword) => {
    if (newPassword !== newPasswordVerify) {
      toast.error("Las nuevas contraseñas no coinciden");
      return;
    }

    if (newPassword === viejaPassword) {
      toast.error("No puedes usar la misma contraseña");
      return;
    }

    changePassword(user.usuario, viejaPassword, newPassword);
    toast.success("Contraseña cambiada exitosamente");
    setShowModal(false);
  };

  const checkIfUserIsFollowed = async (idUser, idSeguido) => {
    const result = await checkIfFollowed(idUser, idSeguido);
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
    if (!user) return;
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
        <UserButtons
          handleRecibirMensajes={handleRecibirMensajes}
          setshowEnviarMensajeModal={setshowEnviarMensajeModal}
          setShowModal={setShowModal}
          handleLogout={handleLogout}
        />
      </div>
      <div
        className="perfil-otros-usuario col-10"
        style={{ maxHeight: "600px", overflowY: "auto" }}
      >
        <UserTable
          users={users}
          followedUsers={followedUsers}
          handleFollow={handleFollow}
          handleUnfollow={handleUnfollow}
          user={user}
        />
      </div>

      {/* Modal enviar mensajes */}
      <EnviarMensajeModal
        show={showEnviarMensajeModal}
        users={users}
        selectedUser={selectedUser}
        mensaje={mensaje}
        handleChangeUser={handleChangeUser}
        setMensaje={setMensaje}
        handleEnviarMensaje={handleEnviarMensaje}
        onClose={() => setshowEnviarMensajeModal(false)}
      />

      {/* Modal para cambiar contraseña */}
      <ChangePasswordModal
        showModal={showModal}
        setShowModal={setShowModal}
        viejaPassword={viejaPassword}
        setViejaPassword={setViejaPassword}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        newPasswordVerify={newPasswordVerify}
        setNewPasswordVerify={setNewPasswordVerify}
        handlePasswordChange={handlePasswordChange}
      />

      {/* Modal mensajes recibidos */}
      <MensajesRecibidosModal
        show={showRecibidosModal}
        notificaciones={notificaciones}
        onClose={() => setShowRecibidosModal(false)}
        cambiarEstadoNotificacion={cambiarEstadoNotificacion}
      />
    </div>
  );
};