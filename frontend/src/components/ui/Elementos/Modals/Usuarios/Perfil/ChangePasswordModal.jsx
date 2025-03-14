import React from "react";

const ChangePasswordModal = ({
  showModal,
  setShowModal,
  viejaPassword,
  setViejaPassword,
  newPassword,
  setNewPassword,
  newPasswordVerify,
  setNewPasswordVerify,
  handlePasswordChange,
}) => {
  if (!showModal) return null;

  return (
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
              <label htmlFor="viejaPassword">Contraseña actual</label>
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
              <label htmlFor="newPasswordVerify">Confirmar Contraseña</label>
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
              onClick={() => handlePasswordChange(newPassword, viejaPassword)}
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;