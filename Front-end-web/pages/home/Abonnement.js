import Navigation from "../Navigation";
import style from "../../styles/Home.module.css";
import Image from "next/dist/client/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import utils from "../utils";
import cookieManager from "../utils/cookieManager";
import articleManager from "../utils/articleManager";

export default function abonnement() {
  let allArticle;
  let array = [];

  useEffect(() => {
    if (window) { 
      window.sessionStorage.setItem("Page", "Abonnement" );
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
        <div className={style.filterContainer}>
          <div>
          <p> Trier par date</p><Image
            src={"/../public/Image/sort.png"}
            atl={"icon connexion"}
            width={25}
            height={25}
          />
          </div>
          <div>
          <p> Trier par nom</p><Image
            src={"/../public/Image/sort_letter.png"}
            atl={"icon connexion"}
            width={25}
            height={25}
          />
          </div>
          <div>
          <p> Trier par abonnement</p><Image
            src={"/../public/Image/fire.png"}
            atl={"icon connexion"}
            width={25}
            height={25}
          />
          </div>
        </div>
        <div className={style.abonnementContainer}>
        <div>
          <img src="/Image/connexion.png"/>
          <p>JeanMichel62</p>
          </div>
          <div>
          <img src="/Image/user.png"/>
          <p>5645</p>
            </div>
            <img src="/Image/comment.png"/>
          <button>
              Désabonner
          </button>
        </div>
     </div>
    </>
    );
  } else {
    return <div>loading...</div>;
  }
}
