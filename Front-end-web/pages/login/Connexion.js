import Navigation from "../Navigation";
import style from "../../styles/Inscription.module.css";
import Link from "next/link";
import Head from "next/head";
import React, { useState } from "react";
import { setCookies, getCookie } from "cookies-next";
import Inscription from "./Inscription";
import Image from "next/dist/client/image";

export default function Connexion() {
  const sanityIoImageLoader = ({ src, width, quality }) => {
    return `https://cdn.sanity.io/${src}?w=${width}&q=${quality || 75}`;
  };

  const [identifiant, setIdentifiant] = useState("");
  const [mdp, setMdp] = useState("");

  const display = async () => {
    console.log(identifiant);
    console.log(mdp);

    function Modal() {
      const [isBrowser, setIsBrowser] = useState(false);

      useEffect(() => {
        setIsBrowser(true);
      }, []);

      if (isBrowser) {
        return ReactDOM.createPortal(
          <div>Hello from modal</div>,
          document.getElementById("modal-root")
        );
      } else {
        return null;
      }
    }

    let res = await fetch("http://localhost:3001/auth/login", {
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
      console.log(res.user);
      getServerSideProps(res.user);
      if (res.user.role == "user" && res.user.isActive == false) {
      }
    }
  };

  const getServerSideProps = (user) => {
    setCookies("token", user, 24 * 3600);
    window.location.href = "/home/Home";
  };

  return (
    <>
      <Head>
        <title>Connexion</title>
      </Head>
      <Navigation></Navigation>
      <div className={style.InscriptionContainer}>
        <div className={style.ConnexionSubContainer}>
          <Image
            loader={sanityIoImageLoader}
            src={"/../public/Image/connexion.png"}
            atl={"icon connexion"}
            width={250}
            height={250}
          />
          <h1>Connexion</h1>
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
