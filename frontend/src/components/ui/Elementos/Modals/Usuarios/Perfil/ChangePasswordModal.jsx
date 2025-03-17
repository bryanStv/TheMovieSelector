import React, { useState } from "react";
import useFetchSendEmail from "../../../../../../apis/email/useFetchSendEmail";
import useFetchVerifyCode from "../../../../../../apis/email/useFetchVerifyCode";
import { useAuth } from "../../../../../../context/AuthContext";
import toast from "react-hot-toast";

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
  const { token } = useAuth();
  const { sendEmail, success } = useFetchSendEmail();
  const { verifyCode} = useFetchVerifyCode();

  const [codigo, setCodigo] = useState("");
  const [codigoValido, setCodigoValido] = useState(false);
  //const [codigoEnviado, setCodigoEnviado] = useState(false);

  if (!showModal) return null;

  const handleRequestCode = async () => {
    /*if (!codigoEnviado) {
      await sendEmail(token);
      setCodigoEnviado(true);
    } else {
      alert("El código ya ha sido enviado");
    }*/
   await sendEmail(token)
   toast.success("Código enviado a tu correo electrónico");
  };

  const handleVerifyCode = async () => {
    await verifyCode(codigo, token);
    //console.log(success)
    if (success) {
      toast.success("Codigo correcto");
      setCodigoValido(true);
    } else {
      //alert("Código incorrecto o expirado");
      toast.error("Código incorrecto o expirado");
    }
  };

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
              {codigoValido ? "Cambiar Contraseña" : "Verificar Código"}
            </h5>
          </div>
          <div className="modal-body">
            {!codigoValido ? (
              <div>
                <p>Puedes enviar una verificación a tu correo.</p>
                <input
                  type="text"
                  className="form-control"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  placeholder="Introduce el código"
                />
                <button
                  className="btn btn-primary mt-2"
                  onClick={handleVerifyCode}
                >
                  Verificar Código
                </button>
                <button
                  className="btn btn-link mt-2"
                  onClick={handleRequestCode}
                >
                  Enviar Código
                </button>
              </div>
            ) : (
              <div>
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
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowModal(false)}
            >
              Cancelar
            </button>
            {codigoValido && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handlePasswordChange(newPassword, viejaPassword)}
              >
                Guardar cambios
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
