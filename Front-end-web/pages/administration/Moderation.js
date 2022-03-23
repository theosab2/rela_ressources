import Navigation from "../Navigation";
import style from "../../styles/administration.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import articleManager from "../utils/articleManager";
import Link from "next/link";

export default function () {
  let allArticle;
  allArticle = articleManager();
  console.log(allArticle);

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
                <th>Catégorie</th>
                <th>Voir publication</th>
                <th>Supprimer la publication</th>
              </tr>
            </thead>
            <tbody>
              {allArticle &&
                allArticle.map((articleInfo) => (
                  <tr>
                    <td>12/09/2000</td>
                    <td>{articleInfo.articleName}</td>
                    <td>{articleInfo.articleContent}</td>
                    <td>{articleInfo.articleCategory}</td>
                    <td>
                      <Link href={`../crudPost/${articleInfo._id}`}>
                        <Image
                          className={style.chowIcon}
                          src="/../public/Image/eye-solid.svg"
                          height="30px"
                          width="30px"
                        />
                      </Link>
                    </td>
                    <td>
                      <input type="button" value="Approuver"></input>
                      <input type="button" value="Supprimer"></input>
                    </td>
                  </tr>
                ))}
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
