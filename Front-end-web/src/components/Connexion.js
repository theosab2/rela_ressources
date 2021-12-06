import Header from "./Header";
import Navigation from "./Navigation";

/*const list = [
    {
        login:'to',
      pass:'1234'
    },
    {
     login:'pe',
     pass:'1234'
    },
]*/
const Connexion = () => {
  <Navigation/>
    return (
      <div>
        <Header/>
        <div className="connexionBody">
          <div>
            <h1>Connexion</h1>
            <h3>Login</h3>
            <input type="text"></input>
            <h3>Mot de passe</h3>
            <input type="password"></input>
            <br/>
            <input type="submit" value="Connexion"></input>
          </div>
        </div>
      </div>
    );
  }
  
/*<ul>
  {list.map((myList,index) =>(
      <li key={`${myList}-${index}`}>{myList.sexe == "masculin" ? myList.name + " est un garçon" : myList.name + " est une fille"}</li>
  ))}
</ul>*/

  export default Connexion;