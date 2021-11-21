import Login from './views/Login.js';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './views/Home.js';
import './App.css';
import NotFound from './views/NotFound';
import Connexion from './components/Connexion.js';
import Inscription from './components/Inscription.js';
import Header from './components/Header.js';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/Login" exact element={<Login/>} />
        <Route path="/Connexion" exact element={<Connexion/>} />
        <Route path="/Inscription" exact element={<Inscription/>} />
        <Route path="/Home" exact element={<Home/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
