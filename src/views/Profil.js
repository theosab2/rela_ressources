import Header from "../components/Header";
import { NavLink } from "react-router-dom";

const Profil = () => {
    return (
      <div>
          <Header/>
          <h1>Profil</h1>
          <NavLink exact to="/Profil/Information" activeClassName="nav-active" className="NavLink">
                Information
            </NavLink>
            <NavLink exact to="/Profil/Historique" activeClassName="nav-active" className="NavLink">
                Historique
            </NavLink>
            <NavLink exact to="/Profil/Preference" activeClassName="nav-active" className="NavLink">
                Préférence
            </NavLink>
      </div>
    );
  }
  
  export default Profil;