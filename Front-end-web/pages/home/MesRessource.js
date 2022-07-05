import Navigation from "../Navigation";
import style from "../../styles/Home.module.css";
import Image from "next/dist/client/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import utils from "../utils";
import cookieManager from "../utils/cookieManager";
import articleManager from "../utils/articleManager";
import { useRouter } from 'next/router'
import ComponentArticle from "./ComponentArticle";

export default function MesRessource() {
  let allArticle;
  let array = [];
  const router = useRouter()

  useEffect(() => {
    if (window) { 
      window.sessionStorage.setItem("Page", "Historique" );
    }
  }, []);
  
    
    allArticle = articleManager();
    const userCookie = cookieManager();

    if (allArticle != null) {
      allArticle.forEach((element) => {
        console.log("Article non filtré ->",element)
        if (element.creator == userCookie._id) {
          array.push(element);
        }
      });

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
          <p> Trier par avis</p><Image
            src={"/../public/Image/fire.png"}
            atl={"icon connexion"}
            width={25}
            height={25}
          />
          </div>
        </div>

        {array &&
          array
            .reverse()
            .map((articleInfo) => (
              <ComponentArticle articleInfo={articleInfo} key={articleInfo._id}/>
              ))}
     </div>
    </>
    );
  } else {
    return <div>loading...</div>;
  }
}
