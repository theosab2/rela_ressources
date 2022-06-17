import Navigation from "../Navigation";
import Head from "next/head";
import style from "../../styles/Inscription.module.css";
import Link from "next/link";
import React, { useEffect,useState } from "react";

export default function Inscription() {
  const [pseudo, setUsername] = useState("");
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (window) { 
      window.sessionStorage.setItem("Page", "Inscription" );
    }
  }, []);

  const display = async () => {
    console.log(pseudo);
    console.log(name);
    console.log(firstname);
    console.log(email);
    console.log(password);
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
      console.log("Le nom d'utilisateurs existe deja");
    } else {
      console.log("Compte crée");
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
            <input
              id="pseudo"
              name="pseudo"
              type="text"
              required
              onChange={(pseudo) => setUsername(pseudo.target.value)}
              defaultValue={pseudo}
            />

            <label >Nom :</label>
            <input
              id="nom"
              name="nom"
              type="text"

              required
              onChange={(name) => setName(name.target.value)}
              defaultValue={name}
            />

            <label >Prénom :</label>
            <input
              id="prenom"
              name="prenom"
              type="text"

              required
              defaultValue={firstname}
              onChange={(firstname) => setFirstname(firstname.target.value)}
            />

            <label >Adresse mail :</label>
            <input
              id="mail"
              name="mail"
              type="email"

              required
              defaultValue={email}
              onChange={(email) => setEmail(email.target.value)}
            />


            <label >Mot de passe :</label>
            <input
              id="mdp"
              name="mdp"
              type="password"

              required
              defaultValue={password}
              onChange={(password) => setPassword(password.target.value)}
            />

            <label>
              Confirmer mot de passe :
            </label>
            <input
              id="confMdp"
              name="confMdp"
              type="password"

              required
            />
          </div>
            <div className={style.conditionUtilisationContainer}>
              <input
                id="condition"
                name="condition"
                type="checkbox"
                required

              />
              <label htmlFor="condition">
                J'accepte les conditions d'utilisation
              </label>
            </div>
            <button
              type="submit"
              onClick={display}
              className={style.buttonApproved}
            >
              Valider
            </button>

        </div>
  );
}
