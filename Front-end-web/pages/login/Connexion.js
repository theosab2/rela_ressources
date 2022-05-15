import Navigation from "../Navigation";
import style from "../../styles/Inscription.module.css";
import Link from "next/link";
import Head from "next/head";
import React, { useState } from "react";
import { setCookies, getCookie } from "cookies-next";
import Inscription from "./Inscription";
import Image from "next/dist/client/image";

import { useEffect } from "react";
export default function Connexion() {
  const sanityIoImageLoader = ({ src, width, quality }) => {
    return `https://cdn.sanity.io/${src}?w=${width}&q=${quality || 75}`;
  };

  const [identifiant, setIdentifiant] = useState("");
  const [mdp, setMdp] = useState("");

  useEffect(() => {
    if (window) { 
      window.sessionStorage.setItem("Page", "Connexion" );
    }
  }, []);

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
    if (res.status != "SUCCESS") {
      console.log(res);
      window.location.href = "/login/Connexion";
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
    window.location.href = "/";
  };

  return (

      <div className={style.connexionContainer}>
        <h1>Connexion</h1>
          <Image
            src={"/../public/Image/connexion.png"}
            atl={"icon connexion"}
            width={100}
            height={100}
          />
          <Link href="./Inscription">
            <a className={style.link}>Je n'ai pas de compte</a>
          </Link>
          <div className={style.connexionInsert}>
            <div className={style.connexionInput}>
              <label>Identifiant :</label>
              <input
                type="text"
                className={style.inputText}
                defaultValue={identifiant}
                onChange={(identifiant) =>
                  setIdentifiant(identifiant.target.value)
                }
              />
            </div>
            <div className={style.connexionInput}>
              <label className="">Mot de passe :</label>
              <input
                type="password"
                className={style.inputText}
                defaultValue={mdp}
                onChange={(mdp) => setMdp(mdp.target.value)}
              />

                            <a className={style.link}>Mot de passe oublié</a>
            </div>

            </div>
            <button
                type="button"
                onClick={display}
                className={style.buttonApproved}
              >
                Valider
              </button>

      </div>
  );
}
