import React from "react";

const MensajesRecibidosModal = ({
  show,
  notificaciones,
  onClose,
  cambiarEstadoNotificacion,
}) => {
  if (!show) return null;

  return (
    <div
      className="modal fade show"
      style={{ display: "block" }}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="ModalMensajesRecibidos"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="ModalMensajesRecibidos">
              Mensajes Recibidos
            </h5>
          </div>
          <div className="modal-body">
            <div className="mensajes-usuarios">
              {notificaciones.map((notificacion, index) => (
                <div
                  key={index}
                  className="mensaje card shadow-sm border-0 mb-3"
                  style={{ maxWidth: "400px", margin: "0 auto" }}
                >
                  <div className="card-body">
                    <h6 className="fw-bold mb-1">
                      {notificacion.nombre_emisor} ({notificacion.emisor_id}):
                    </h6>
                    <small className="text-muted ">
                      {new Date(notificacion.fecha).toLocaleString()} ·{" "}
                    </small>
                    <small
                      className={
                        notificacion.estado === "leído"
                          ? "text-danger"
                          : "text-success"
                      }
                    >
                      {notificacion.estado}
                    </small>
                    <p className="mt-2">{notificacion.mensaje}</p>
                    <button
                      className={
                        notificacion.estado === "leído"
                          ? "btn btn-danger btn-sm"
                          : "btn btn-success btn-sm"
                      }
                      //className="btn btn-primary"
                      onClick={() =>
                        cambiarEstadoNotificacion(
                          notificacion.id,
                          notificacion.estado
                        )
                      }
                    >
                      Cambiar a{" "}
                      {notificacion.estado === "leído" ? "no leído" : "leído"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MensajesRecibidosModal;

/*const MensajesRecibidosModal = ({ show, notificaciones, onClose }) => {
  if (!show) return null;

  return (
    <div
      className="modal fade show"
      style={{ display: "block" }}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="ModalMensajesRecibidos"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="ModalMensajesRecibidos">
              Mensajes Recibidos
            </h5>
          </div>
          <div className="modal-body">
            <div className="mensajes-usuarios">
              {notificaciones.map((notificacion, index) => (
                <div
                  key={index}
                  className="mensaje card shadow-sm border-0 mb-3"
                  style={{ maxWidth: "400px", margin: "0 auto" }}
                >
                  <div className="card-body">
                    <h6 className="fw-bold mb-1">
                      {notificacion.nombre_emisor} ({notificacion.emisor_id}):
                    </h6>
                    <small className="text-muted">
                      {notificacion.fecha} · {notificacion.estado}
                    </small>
                    <p className="mt-2">{notificacion.mensaje}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MensajesRecibidosModal;*/
