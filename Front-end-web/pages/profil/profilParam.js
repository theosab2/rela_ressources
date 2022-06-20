import style from "../../styles/profil.module.css";
import { useEffect, useState } from "react";
import utils from "../utils";

export default function ProfilParam() {
  const userCookie = utils();
  if (userCookie != false) {
    return (
      <div className={style.paramContainer}>
        <div className={style.paramGenContainer}>
          <h3>Modifier mot de passe</h3>
          <div className={style.changePass}>
            <label>Ancien mot de passe</label>
            <input type="password"></input>
            <label>Nouveau mot de passe</label>
            <input type="password"></input>
            <label>Confirmer nouveau mot de passe</label>
            <input type="password"></input>
            <input type="submit" value="Valider"></input>
          </div>
        </div>
      </div>
    );
  } else return <div> Loading...</div>;
}
