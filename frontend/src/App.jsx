import './App.css'
import { Routes } from "./routes/Routes";
import { PelisFavoritasProvider } from "./context/FavoritasContext";
import { TraducirProvider } from './context/TraducirContext';
import { AuthContextProvider } from './context/AuthContext';

function App() {
  return (
    <AuthContextProvider>
      <TraducirProvider>
        <PelisFavoritasProvider>
          <Routes />
        </PelisFavoritasProvider>
      </TraducirProvider>
    </AuthContextProvider>
  );
}

export default App;
