import style from "../../styles/profil.module.css";
import { useEffect, useState } from "react";
import utils from "../utils";
export default function ProfilHistorique() {
  const showModalHisto = () => {
    document.getElementById("myModalHisto").style.display = "block";
  };

  const closeModalHisto = () => {
    document.getElementById("myModalHisto").style.display = "none";
  };

  const userCookie = utils();
  if (userCookie != false) {
    const userInfo = JSON.parse(userCookie);
    return (
      <div className={style.tabHistorique}>
        <table>
          <thead>
            <tr>
              <th>Date publication</th>
              <th>Titre publication</th>
              <th>Nombre de j'aime</th>
              <th>Supprimer la publication</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>12/09/2000</td>
              <td>Je suis un titre</td>
              <td>36</td>
              <td>
                <input
                  type="button"
                  value="Supprimer"
                  onClick={showModalHisto}
                ></input>
              </td>
            </tr>
          </tbody>
        </table>
        <div id="myModalHisto" className={style.modalHisto}>
          <div className={style.modalContentHisto}>
            <span className={style.closeHisto} onClick={closeModalHisto}>
              &times;
            </span>
            <p>Supprimer article ?</p>
            <div className={style.modalButtonContentHisto}>
              <input type="button" value="Valider"></input>
              <input
                type="button"
                value="Annuler"
                onClick={closeModalHisto}
              ></input>
            </div>
          </div>
        </div>
      </div>
    );
  } else return <div> Loading...</div>;
}
