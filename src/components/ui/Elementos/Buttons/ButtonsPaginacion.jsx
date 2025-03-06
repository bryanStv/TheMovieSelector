export const ButtonsPagination = ({
    paginacionFetchAnt,
    paginacionFetchSig,
    pagina,
    totalPaginas
}) => {
    return (
      <>
        <div
          className="btn-group d-flex justify-content-center"
          role="group"
          aria-label="grupoBotonesPaginacion"
        >
          <button
            type="button"
            className="btn btn-primary"
            onClick={paginacionFetchAnt}
            disabled={pagina <= 1}
          >
            Anterior
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={paginacionFetchSig}
            disabled={pagina >= totalPaginas}
          >
            Siguiente
          </button>
        </div>
      </>
    );
}