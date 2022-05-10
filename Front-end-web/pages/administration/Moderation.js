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

  async function modererArticle(id, bool) {
    console.log(id);
    let res = await fetch("http://localhost:3001/article/" + id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        article: {
          articleIsApproved: bool,
        },
      }),
    });
    res = await res.json();
  }

  return (
    <>
      <div className={style.mainContainer}>
        <input type="text" placeholder="Recherche" className={style.searchBar}></input>
        <div className={style.articleContainer}>
          <div className={style.firstPartContainer}>
            <div className={style.firstInfo}>
              <div className={style.userInfoContainer}>
                <img src="/Image/connexion.png" className={style.userPicture}/>
                <div className={style.userPostInfoContainer}>
                  <div className={style.userName}>JeanMichelle</div>
                  <div className={style.publicationDate}>Publication : Il y a 4h</div>
                </div>
              </div>
              <div className={style.articleTitle}>Je suis un jolie titre</div>
            </div>
            <img src="/Image/Bateau_2.jpg" className={style.articlePicture}/>
          </div>
          <div className={style.articleBody}>Je suis une courte description de ce qui se trouve sur l’image dans le bas de la ressource et il y a une faute d’orthographe</div>
          <div className={style.articleFooter}>
            <div className={style.articleRate}>
              <img src="/Image/alert.png" className={style.like}/>
              <img src="/Image/comment.png" className={style.like}/>
            </div>
            <div className={style.articleOption}>
          </div>
        </div>
      </div>
     </div>
    </>
  );
}
