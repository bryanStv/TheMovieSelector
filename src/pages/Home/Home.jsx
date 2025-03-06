import "./Home.css"
import { FormattedMessage } from "react-intl";

export const Home = () => {
    return (
      <main>
        <div className="container py-4">
          <header className="pb-3 mb-4 border-bottom">
            <a
              href="/"
              className="d-flex align-items-center text-dark text-decoration-none"
            >
              {/*<span className="fs-4">Bienvenido a The Movie Selector</span>*/}
              <span className="fs-4">
                <FormattedMessage
                  id="message.home-welcome-title"
                  defaultMessage="Bienvenido a The Movie Selector"
                />
              </span>
            </a>
          </header>

          <div className="p-5 mb-4 bg-light rounded-3">
            <div className="container-fluid py-5">
              <h1 className="display-5 fw-bold">
                <FormattedMessage
                  id="message.home-welcome-jumbotron"
                  defaultMessage="El lugar para tus películas"
                />
              </h1>
              <p className="col-md-8 fs-4">
                <FormattedMessage
                  id="message.home-welcome-text"
                  defaultMessage="Usando una serie de utilidades, puedes crear este jumbotron, tal\ncomo en versiones anteriores de Bootstrap. Consulta los \nejemplos a continuación para ver cómo puedes modificarlo y estilizarlo a tu\ngusto."
                />
              </p>
              <button className="btn btn-primary btn-lg" type="button">
                <FormattedMessage
                id="message.home-more-information-button"
                defaultMessage="Más información"
                />
              </button>
            </div>
          </div>
          <footer className="pt-3 mt-4 text-muted border-top">
            &copy; 2025
          </footer>
        </div>
      </main>
    );
}