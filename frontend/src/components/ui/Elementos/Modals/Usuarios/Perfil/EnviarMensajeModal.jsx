import React from "react";

const EnviarMensajeModal = ({
  show,
  users,
  selectedUser,
  mensaje,
  handleChangeUser,
  setMensaje,
  handleEnviarMensaje,
  onClose,
}) => {
  if (!show) return null;

  return (
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
              onClick={onClose}
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
  );
};

export default EnviarMensajeModal;