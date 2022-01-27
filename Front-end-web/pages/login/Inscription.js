import Navigation from "../Navigation";
import Head from "next/head";
import style from "../../styles/Inscription.module.css";
import Link from "next/link";
import React, { useState } from "react";

export default function Inscription() {
  const [pseudo, setUsername] = useState("");
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [region, setRegion] = useState("");

  const display = async () => {
    console.log(pseudo);
    const res = await fetch("http://10.176.131.75:3000/auth/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: pseudo,
          firstname: firstname,
          name: name,
          password: password,
          phone: phone,
          email: email,
          isActive: false,
          role: "user",
          location: {
            ville: "ee",
            region: "re",
            zip: "zip",
          },
        },
      }),
    });
    res = await res.json();
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
    <>
      <Head>
        <title>Inscrption</title>
      </Head>
      <Navigation />
      <div className={style.InscriptionContainer}>
        <div className={style.InscriptionSubContainer}>
          <p>Inscription</p>
          <Link href="./Connexion">
            <a className={style.InscriptionLink}>J'ai déjà compte</a>
          </Link>
          <form className={style.FormInscription}>
            <label className={style.LabelInscription}>
              Nom d'utilisateurs :
            </label>
            <input
              id="pseudo"
              name="pseudo"
              type="text"
              className={style.InputInscrption}
              required
              onChange={(pseudo) => setUsername(pseudo.target.value)}
              defaultValue={pseudo}
            />

            <label className={style.LabelInscription}>Nom :</label>
            <input
              id="nom"
              name="nom"
              type="text"
              className={style.InputInscrption}
              required
              onChange={(name) => setName(name.target.value)}
              defaultValue={name}
            />

            <label className={style.LabelInscription}>Prénom :</label>
            <input
              id="prenom"
              name="prenom"
              type="text"
              className={style.InputInscrption}
              required
              defaultValue={firstname}
              onChange={(firstname) => setFirstname(firstname.target.value)}
            />

            <label className={style.LabelInscription}>Adresse mail :</label>
            <input
              id="mail"
              name="mail"
              type="email"
              className={style.InputInscrption}
              required
              defaultValue={email}
              onChange={(email) => setEmail(email.target.value)}
            />

            <label className={style.LabelInscription}>
              Numéro de téléphone :
            </label>
            <input
              id="telephone"
              name="telephone"
              type="tel"
              className={style.InputInscrption}
              required
              defaultValue={phone}
              onChange={(phone) => setPhone(phone.target.value)}
            />

            <label className={style.LabelInscription}>Région :</label>
            <input
              id="region"
              name="region"
              type="text"
              className={style.InputInscrption}
              required
              defaultValue={region}
              onChange={(region) => setRegion(region.target.value)}
            />

            <label className={style.LabelInscription}>Mot de passe :</label>
            <input
              id="mdp"
              name="mdp"
              type="password"
              className={style.InputInscrption}
              required
              defaultValue={password}
              onChange={(password) => setPassword(password.target.value)}
            />

            <label className={style.LabelInscription}>
              Confirmer mot de passe :
            </label>
            <input
              id="confMdp"
              name="confMdp"
              type="password"
              className={style.InputInscrption}
              required
            />

            <div>
              <input
                id="condition"
                name="condition"
                type="checkbox"
                required
                className={style.CheckBoxInscription}
              />
              <label htmlFor="condition">
                J'accepte les conditions d'utilisation
              </label>
            </div>
            <button
              type="submit"
              className={style.SubmitInscription}
              onClick={display}
            >
              Inscription
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
