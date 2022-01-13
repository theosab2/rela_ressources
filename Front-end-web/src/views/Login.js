import { NavLink } from "react-router-dom";
import Header from "../components/Header";

function Login() {
    return (
      <div>
        <Header/>
        <div className="loginBody">
          <NavLink exact to="../Connexion" activeClassName="nav-active" className="NavLink">
            <p>Connexion</p>
          </NavLink>
          <NavLink exact to="../Inscription" activeClassName="nav-active" className="NavLink">
            <p>Inscription</p>
          </NavLink>
        </div>
      </div>
    );
  }
  
  export default Login;