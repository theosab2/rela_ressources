import Login from './views/Login.js';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './views/Home.js';
import './App.css';
import NotFound from './views/NotFound';
import Connexion from './components/Connexion.js';
import Inscription from './components/Inscription.js';
import Profil from './views/Profil.js';
import ProfilInformation from './components/Profil/ProfilInformation'
import ProfilHistorique from './components/Profil/ProfilHistorique'
import ProfilPreference from './components/Profil/ProfilPreference'
import Administrateur from './components/Administration/Administrateur'
import Moderateur from './components/Administration/Moderateur';
import Admin from './views/Admin';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/Login" exact element={<Login/>} />
        <Route path="/Connexion" exact element={<Connexion/>} />
        <Route path="/Inscription" exact element={<Inscription/>} />
        <Route path="/Home" exact element={<Home/>} />
        <Route path="/Profil" exact element={<Profil/>} />
        <Route path="/Profil/Information" exact element={<ProfilInformation/>} />
        <Route path="/Profil/Preference" exact element={<ProfilHistorique/>} />
        <Route path="/Profil/Historique" exact element={<ProfilPreference/>} />
        <Route path="/Admin" exact element={<Admin/>} />
        <Route path="/Admin/Moderateur" exact element={<Moderateur/>} />
        <Route path="/Admin/Administrateur" exact element={<Administrateur/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
