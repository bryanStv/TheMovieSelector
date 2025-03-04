//import { useEffect, useState } from "react";
import "./Home.css"
import MovieLogo from "../../assets/movie-tickets-svgrepo-com.svg"

export const Home = () => {
    return (
      <main>
        <div className="container py-4">
          <header className="pb-3 mb-4 border-bottom">
            <a
              href="/"
              className="d-flex align-items-center text-dark text-decoration-none"
            >
              <img
                src={MovieLogo}
                width={40}
                height={32}
                alt="TheMovieSelector"
              />
              <span className="fs-4">Bienvenido a TheMovieSelector</span>
            </a>
          </header>

          <div className="p-5 mb-4 bg-light rounded-3">
            <div className="container-fluid py-5">
              <h1 className="display-5 fw-bold">El lugar para tus películas</h1>
              <p className="col-md-8 fs-4">
                Using a series of utilities, you can create this jumbotron, just
                like the one in previous versions of Bootstrap. Check out the
                examples below for how you can remix and restyle it to your
                liking.
              </p>
              <button className="btn btn-primary btn-lg" type="button">
                Más información
              </button>
            </div>
          </div>
          <footer className="pt-3 mt-4 text-muted border-top">&copy; 2025 Pruebas</footer>
        </div>
      </main>
    );
}