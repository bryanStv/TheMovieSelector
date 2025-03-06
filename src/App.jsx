import './App.css'
import { Routes } from "./routes/Routes";
import { PelisFavoritasProvider } from "./context/FavoritasContext";
import { TraducirProvider } from './context/TraducirContext';

function App() {
  return (
    <TraducirProvider>
      <PelisFavoritasProvider>
        <Routes />
      </PelisFavoritasProvider>
    </TraducirProvider>
  );
}

export default App;
