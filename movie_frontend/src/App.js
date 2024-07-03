import "./App.css";
import Home from "./components/Home.jsx";
import { Routes, Route } from "react-router-dom";
import AddMovie from "./components/AddMovie";
import MovieDetails from "./components/MovieDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<AddMovie />} />
      <Route path="/movie" element={<MovieDetails />} />
    </Routes>
  );
}

export default App;
