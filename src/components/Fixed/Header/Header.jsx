import "./Header.css"
import { NavBar } from "../../ui/Header/NavBar/NavBar"

export const Header = ({ onChangeLanguage }) => {
    return (
      <header>
        {/*<h1>The Movie Selector</h1>*/}
        <NavBar onChangeLanguage={onChangeLanguage} />
        {/*<nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>*/}
      </header>
    );
}
