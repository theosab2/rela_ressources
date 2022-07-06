import Navigation from "../Navigation";
import Head from "next/head";
import style from "../../styles/Inscription.module.css";
import Link from "next/link";
import React, { useEffect,useState } from "react";
import ComponentConnexion from "./ComponentConnexion";

export default function Inscription() {
  const [pseudo, setUsername] = useState("");
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [check,setCheck] = useState(false);
  const [error,setError] = useState("");

  useEffect(() => {
    if (window) { 
      window.sessionStorage.setItem("Page", "Inscription" );
    }
  }, []);

  const inscription = async () => {
    console.log(password);
    console.log(email);
    if(check == true){
    let res = await fetch("http://"+process.env.IP+":3001/auth/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: pseudo,
          firstname: firstname,
          lastname: name,
          password: password,
          email: email,
        },
      }),
    });
    res = await res.json();
    console.log(res);
    if (res.status == "FAILURE") {
      setError("Le nom d'utilisateurs ou adresse mail existe deja");
    } else {
      console.log("Compte crée");
      ComponentConnexion(email,password)
    }
  }else{
    setError("Vous devez accepter les conditions d'utilisation");
  }
  };

  const submitUser = async (event) => {
    event.preventDefault();
    alert("Your name is " + event.target.name.value);
  };

  return (
        <div className={style.connexionContainer}>
          <h1>Créer un compte</h1>
          <Link href="./Connexion" >
            <a className={style.link}>J'ai déjà compte</a>
          </Link>
          <div className={style.inputContainer}>
            <label >
              Nom d'utilisateurs :
            </label>
            <div className={style.inputDiv}>
              <img src="/Image/user.png" className={style.InputImg}/>
              <input
                id="pseudo"
                name="pseudo"
                type="text"
                required
                onChange={(pseudo) => setUsername(pseudo.target.value)}
                defaultValue={pseudo}
              />
            </div>
            
            <label >Nom :</label>
            <div className={style.inputDiv}>
            <img src="/Image/user.png" className={style.InputImg}/>
              <input
                id="nom"
                name="nom"
                type="text"
                required
                onChange={(name) => setName(name.target.value)}
                defaultValue={name}
              />
            </div>
            <label >Prénom :</label>
            <div className={style.inputDiv}>
              <img src="/Image/user.png" className={style.InputImg}/>
              <input
                id="prenom"
                name="prenom"
                type="text"
                required
                defaultValue={firstname}
                onChange={(firstname) => setFirstname(firstname.target.value)}
              />
            </div>

            <label >Adresse mail :</label>
            <div className={style.inputDiv}>
              <img src="/Image/enveloppe-de-courrier-electronique.png" className={style.InputImg}/>
              <input
                id="mail"
                name="mail"
                type="email"
                required
                defaultValue={email}
                onChange={(email) => setEmail(email.target.value)}
              />
            </div>


            <label >Mot de passe :</label>
            <div className={style.inputDiv}>
              <img src="/Image/key.png" className={style.InputImg}/>
              <input
                id="mdp"
                name="mdp"
                type="password"
                required
                defaultValue={password}
                onChange={(password) => setPassword(password.target.value)}
              />
            </div>

            <label>
              Confirmer mot de passe :
            </label>
            <div className={style.inputDiv}>
              <img src="/Image/key.png" className={style.InputImg}/>
              <input
                id="confMdp"
                name="confMdp"
                type="password"
                required
              />
            </div>
          </div>
            <div className={style.conditionUtilisationContainer}>
              <input
                id="condition"
                name="condition"
                type="checkbox"
                required
                onClick={() => setCheck(true)}
              />
              <label htmlFor="condition">
                J'accepte les conditions d'utilisation
              </label>
            </div>
            <p className={style.errorMessage}>{error}</p>
            <button
              type="submit"
              onClick={inscription}
              className={style.buttonApproved}
            > 
              Valider
            </button>
        </div>
  );
}
