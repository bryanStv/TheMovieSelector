import "./PaginaError.css"
import errorImage from "../../assets/error.webp"

export const PaginaError = () => {
    return (
      <div className="d-flex flex-column min-vh-100 p-0 m-0">
        <div className="d-flex justify-content-center align-items-center flex-grow-1">
          <img src={errorImage} className="img-fluid" alt="Imagen de error" />
        </div>
      </div>
    );
}

{/* 
      <div className="errorPagina">
        <img src={errorImage} style={{ width: "stretch-content" }}></img>
      </div>
*/}