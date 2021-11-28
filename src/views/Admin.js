import Header from "../components/Header";
import { NavLink } from "react-router-dom";


const Home = () => {
    return (
      <div>
          <Header/>
          <h1>Admin</h1>
          <NavLink exact to="/Admin/Administrateur" activeClassName="nav-active" className="NavLink">
            <p>Connexion</p>
          </NavLink>
          <NavLink exact to="/Admin/Moderateur" activeClassName="nav-active" className="NavLink">
            <p>Inscription</p>
          </NavLink>
      </div>
    );
  }
  
  export default Home;