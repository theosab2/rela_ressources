import style from "../../styles/profil.module.css";
import { useEffect, useState } from "react";
import utils from "../utils";
export default function ProfilHistorique() {
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
                <input type="button" value="Supprimer"></input>
              </td>
            </tr>
            <tr>
              <td>12/09/2000</td>
              <td>Je suis un titre</td>
              <td>36</td>
              <td>
                <input type="button" value="Supprimer"></input>
              </td>
            </tr>
            <tr>
              <td>12/09/2000</td>
              <td>Je suis un titre</td>
              <td>36</td>
              <td>
                <input type="button" value="Supprimer"></input>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  } else return <div> Loading...</div>;
}
