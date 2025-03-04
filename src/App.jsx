import './App.css'
import { Routes } from "./routes/Routes";
import { PelisFavoritasProvider } from "./context/FavoritasContext";

function App() {
  return (
    <PelisFavoritasProvider>
      <Routes />
    </PelisFavoritasProvider>
  );
}

export default App;
