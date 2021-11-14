
const list = [
    {
        name:'to',
        sexe:'masculin'
    },
    {
     name:'pe',
     sexe:'feminin'
    },
]
function Connexion() {
    return (
      <div className="connexionBody">
          <h1>Connexion</h1>
          <h3>Login</h3>
          <input type="text"></input>
          <h3>Mot de passe</h3>
          <input type="password"></input>
          <br/>
          <input type="submit" value="Connexion"></input>
          <ul>
            {list.map((myList,index) =>(
                <li key={`${myList}-${index}`}>{myList.sexe == "masculin" ? myList.name + " est un garçon" : myList.name + " est une fille"}</li>
            ))}
          </ul>
      </div>
    );
  }
  
  export default Connexion;