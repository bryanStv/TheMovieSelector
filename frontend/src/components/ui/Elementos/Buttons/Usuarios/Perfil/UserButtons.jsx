const UserButtons = ({
  handleRecibirMensajes,
  setshowEnviarMensajeModal,
  setShowModal,
  handleLogout,
}) => {
  return (
    <div
      className="botones-usuario"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <button
        className="btn btn-primary btn-sm position-relative"
        onClick={handleRecibirMensajes}
      >
        Mensajes
        <span className="position-absolute top-0 start-100 translate-middle p-2 bg-success border border-light rounded-circle">
          <span className="visually-hidden">Nuevos Mensajes</span>
        </span>
      </button>
      <button
        className="btn btn-success btn-sm mt-0"
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
  );
};

export default UserButtons;