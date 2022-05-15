import Navigation from "../Navigation";
import style from "../../styles/Home.module.css";
import Image from "next/dist/client/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import utils from "../utils";
import cookieManager from "../utils/cookieManager";
import articleManager from "../utils/articleManager";

export default function Groupe() {
  let allArticle;
  let array = [];

  useEffect(() => {
    if (window) { 
      window.sessionStorage.setItem("Page", "Groupe" );
    }
  }, []);

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
        <div className={style.groupeContainer}>
            <div className={style.groupContainerImage}>
            <img src="/Image/Bateau_2.jpg" className={style.groupeImage}/>
            </div>
            <div className={style.groupContainerIcone}>
                <div className={style.groupContainerInfo}>
                    <div>
                        <img src="/Image/user.png"/>
                        <p>383</p>
                    </div>
                <img src="/Image/oeil.png"/>
                
                <button>
                Rejoindre
                </button>
                </div>
                <div>
                    <div>
                        <p>Groupe de partage d’information sur les actions féministes mené en France</p>
                    </div>
                </div>
            </div>
        </div>
     </div>
    </>
    );
  } else {
    return <div>loading...</div>;
  }
}
