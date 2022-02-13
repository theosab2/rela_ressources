import style from "../../styles/profil.module.css";
import { useEffect, useState } from "react";
import utils from "../utils";

export default function ProfilParam() {
  const userCookie = utils();
  if (userCookie != false) {
    const userInfo = JSON.parse(userCookie);
    return (
      <div className={style.paramContainer}>
        <div className={style.paramGenContainer}>
          <h3>Paramètres généraux</h3>
          <div>
            <p>
              Je ne souhaite pas communiquer mes informations de localisation
            </p>
            <input type="checkbox"></input>
          </div>
          <div>
            <p>
              Je ne souhaite pas affiner les publication en fonction de mon
              historique
            </p>
            <input type="checkbox"></input>
          </div>
        </div>
        <div className={style.prefContainer}>
          <h3>Preférences</h3>
          <div>
            <p>Autoriser le visionnage de contenu sensible</p>
            <input type="checkbox"></input>
          </div>
          <div>
            <p>Partager mon nom et prénom</p>
            <input type="checkbox"></input>
          </div>
          <div>
            <p>Partager ma localisation</p>
            <input type="checkbox"></input>
          </div>
        </div>
        <a>Politique de confidentialité</a>
      </div>
    );
  } else return <div> Loading...</div>;
}
