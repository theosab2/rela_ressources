import Header from "./Header";
import Navigation from "./Navigation";

const Inscription = () => {
  <Navigation/>
    return (
      <div>
        <Header/>
          <h1>Inscription</h1>
          <h3>Adress mail</h3>
          <input type="text"></input>
          <h3>Mot de passe</h3>
          <input type="password"></input>
          <br/>
          <input type="submit" value="Connexion"></input>
      </div>
    );
  }
  
  export default Inscription;