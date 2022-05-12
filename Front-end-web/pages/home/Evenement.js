import Navigation from "../Navigation";
import style from "../../styles/Home.module.css";
import Image from "next/dist/client/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import utils from "../utils";
import cookieManager from "../utils/cookieManager";
import articleManager from "../utils/articleManager";

export default function Evenement() {
  let allArticle;
  let array = [];

  allArticle = articleManager();
  const userCookie = cookieManager();

  if (allArticle != null) {
    const userInfo = JSON.parse(userCookie);

    allArticle.forEach((element) => {
      if (element.articleCreator == userInfo._id) {
        array.push(element);
      }
    });

    console.log(allArticle);
    return (
      <>
      <div className={style.mainContainer}>
      <input type="text" placeholder="Recherche" className={style.searchBar}></input>
        <div className={style.eventContainer}>
            <div className={style.eventContainerInfo}>
                <img src="/Image/photo-banc.jpg" className={style.eventImg}/>
                <div className={style.eventMainInfo}>
                    <div className={style.eventHeader}>
                        <div className={style.eventUser}>
                        <img src="/Image/user.png"/>
                        <p>345</p>
                        </div>
                        <p>12/03/2023</p>
                        <button>Rejoindre</button>
                    </div>
                    <div>
                        Je suis un titre d'evenement
                    </div>
                </div>
            </div>
            <div className={style.eventDescription}>
                <p>Description :</p>
            <p>Cet événement est payant : 10€ par personne
Pas d’enfant, pas d’alcool. Pas de vrai artiste. Pas de budget</p>
            </div>
        </div>
     </div>
    </>
    );
  } else {
    return <div>loading...</div>;
  }
}
