import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Actors from "./pages/Actors";
import Producers from "./pages/Producers";
import Login from "./pages/Login";
import AddMovie from "./pages/AddMovie";
import Signup from "./pages/Signup";
import Protect from "./components/Protect";
import { Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className="container--main">
          <Routes>
            <Route path="/" element={<Home url={"/movie"} />} />
            <Route
              path="/moviesbyproducer/:id"
              element={<Home url={"/producer"} />}
            />
            <Route
              path="/moviesbyactor/:id"
              element={<Home url={"/actor"} />}
            />
            <Route path="/actors" element={<Actors />} />
            <Route path="/producers" element={<Producers />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/addmovie"
              element={<Protect Component={AddMovie} />}
            />
            <Route
              path="/editmovie/:id"
              element={<Protect Component={AddMovie} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
