import Navigation from "../Navigation";
import style from "../../styles/Inscription.module.css";
import Link from "next/link";
import Head from "next/head";
import React, { useState } from "react";

export default function Connexion() {
  const [identifiant, setIdentifiant] = useState("");
  const [mdp, setMdp] = useState("");

  const display = async () => {
    console.log(identifiant);
    console.log(mdp);

    const res = await fetch("http://10.176.131.75:3000/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: identifiant,
        password: mdp,
      }),
    });
    res = await res.json();
    if (res.status == "FAILURE") {
      console.log("Erreur de connexion");
    } else {
      console.log("Connexion");
      getServerSideProps();
    }
  };

  const getServerSideProps = () => {
    setCookies("token", "ABCD", { expires: 1 / 24 });
  };

  return (
    <>
      <Head>
        <title>Connexion</title>
      </Head>
      <Navigation></Navigation>
      <div className={style.InscriptionContainer}>
        <div className={style.ConnexionSubContainer}>
          <Link href="./Inscription">
            <a className={style.InscriptionLink}>Je n'ai pas de compte</a>
          </Link>
          <form className={style.FormInscription}>
            <label className={style.LabelInscription}>Identifiant :</label>
            <input
              type="text"
              className={style.InputInscrption}
              defaultValue={identifiant}
              onChange={(identifiant) =>
                setIdentifiant(identifiant.target.value)
              }
            />

            <label className={style.LabelInscription}>Mot de passe :</label>
            <input
              type="password"
              className={style.InputInscrption}
              defaultValue={mdp}
              onChange={(mdp) => setMdp(mdp.target.value)}
            />

            <div>
              <input
                type="checkbox"
                className={style.CheckBoxInscription}
              ></input>
              <label className={style.LabelInscription}>
                Rester connecter ?
              </label>
            </div>
            <button
              type="button"
              onClick={display}
              className={style.SubmitInscription}
            >
              Connexion
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
