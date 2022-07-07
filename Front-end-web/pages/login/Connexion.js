import Navigation from "../Navigation";
import style from "../../styles/Inscription.module.css";
import Link from "next/link";
import Head from "next/head";
import React, { useState } from "react";
import { setCookies, getCookie } from "cookies-next";
import Inscription from "./Inscription";
import Image from "next/dist/client/image";
import login from "./login";
import { useEffect } from "react";
import ComponentAdminRole from "../administration/ComponentAdminRole";
import { useRouter } from "next/router";

export default function Connexion() {
  const [identifiant, setIdentifiant] = useState("");
  const [mdp, setMdp] = useState("");
  const [load, setLoad] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (window) { 
      window.sessionStorage.setItem("Page", "Connexion" );
    }
  }, []);

  const display = async () => {
    login(identifiant,mdp);
    //window.sessionStorage.setItem("Page", "Accueil");
    setInterval(() => {
      window.sessionStorage.setItem("Page", "Accueil" );
      router.reload(window.location.pathname)
    }, 2000);
    
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
            <div className={style.inputContainer}>
              <label>Identifiant :</label>
              <div className={style.inputDiv}>
              <img src="/Image/user.png" className={style.InputImg}/>
              <input
                type="text"
                className={style.inputText}
                defaultValue={identifiant}
                onChange={(identifiant) =>
                  setIdentifiant(identifiant.target.value)
                }
              />
            </div>
            
              <label>Mot de passe :</label>
              <div className={style.inputDiv}>
              <img src="/Image/key.png" className={style.InputImg}/>
              <input
                type="password"
                className={style.inputText}
                defaultValue={mdp}
                onChange={(mdp) => setMdp(mdp.target.value)}
              />
              </div>
              <a className={style.link}>Mot de passe oublié</a>
            </div>
            {load ? <div className={style.errorMessage}>{error}</div>:<></>}
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
