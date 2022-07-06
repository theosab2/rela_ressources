import Navigation from "../Navigation";
import style from "../../styles/Home.module.css";
import Image from "next/dist/client/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import utils from "../utils";
import cookieManager from "../utils/cookieManager";
import articleManager from "../utils/articleManager";
import ShowAmis from "./ComponentShowAmis";
import userManager from "../utils/userManager";

export default function abonnement() {
  
  const userCookie = cookieManager();
  let allUser = null;
  let arrayUser = [];

  useEffect(() => {
    if (window) { 
      window.sessionStorage.setItem("Page", "Abonnement" );
    }
  }, []);
  
  allUser = userManager();

  if (allUser != null) {
      allUser.forEach(element => {
          if(element.relation_ids.includes(userCookie._id)){
            arrayUser.push(element);
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
          <p> Trier par abonnement</p><Image
            src={"/../public/Image/fire.png"}
            atl={"icon connexion"}
            width={25}
            height={25}
          />
          </div>
        </div>
        {arrayUser && arrayUser.map((user) => (
          <ShowAmis userCookie={userCookie} friend={user} key={user._id}/>
          ))}
      </div>
    </>
    );
  } else {
    return <div>loading...</div>;
  }
}
