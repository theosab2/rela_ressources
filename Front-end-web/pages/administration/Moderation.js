import Navigation from "../Navigation";
import style from "../../styles/administration.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function () {
  const showModal = () => {
    document.getElementById("myModal").style.display = "block";
  };

  const closeModal = () => {
    document.getElementById("myModal").style.display = "none";
  };

  return (
    <>
      <div className={style.createContainer}>
        <div className={style.tabHistorique}>
          <table>
            <thead>
              <tr>
                <th>Date publication</th>
                <th>Titre publication</th>
                <th>Nom du publicateur</th>
                <th>Voir publication</th>
                <th>Supprimer la publication</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>12/09/2000</td>
                <td>Je suis un titre</td>
                <td>Jean</td>
                <td>
                  <Image
                    className={style.chowIcon}
                    onClick={showModal}
                    src="/../public/Image/eye-solid.svg"
                    height="30px"
                    width="30px"
                  />
                </td>
                <td>
                  <input type="button" value="Approuver"></input>
                  <input type="button" value="Supprimer"></input>
                </td>
              </tr>
              <tr>
                <td>12/09/2000</td>
                <td>Je suis un titre</td>
                <td>Pierre</td>
                <td>
                  <Image
                    className={style.chowIcon}
                    src="/../public/Image/eye-solid.svg"
                    height="30px"
                    width="30px"
                    onClick={showModal}
                  />
                </td>
                <td>
                  <input type="button" value="Approuver"></input>
                  <input type="button" value="Supprimer"></input>
                </td>
              </tr>
              <tr>
                <td>12/09/2000</td>
                <td>Je suis un titre</td>
                <td>Thierry</td>
                <td>
                  <Image
                    className={style.chowIcon}
                    src="/../public/Image/eye-solid.svg"
                    height="30px"
                    width="30px"
                    onClick={showModal}
                  />
                </td>
                <td>
                  <input type="button" value="Approuver"></input>
                  <input type="button" value="Supprimer"></input>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="myModal" className={style.modal}>
          <div className={style.modal_content}>
            <span className={style.close} onClick={closeModal}>
              &times;
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
