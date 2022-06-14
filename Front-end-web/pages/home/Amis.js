import Navigation from "../Navigation";
import style from "../../styles/Home.module.css";
import Image from "next/dist/client/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import utils from "../utils";
import cookieManager from "../utils/cookieManager";
import articleManager from "../utils/articleManager";
import userManager from "../utils/userManager";
import abonnement from "./Abonnement";
import ShowAmis from "./ComponentShowAmis";

export default function Amis() {
  const [searchFriend, setSearchFriend] = useState("");
  let allUser = null;
  let arrayUser = [];


  useEffect(() => {
    if (window) { 
      window.sessionStorage.setItem("Page", "Amis" );
    }
  }, []);

  const userCookie = cookieManager();
  allUser = userManager();

  if (allUser != null) {
    const userInfo = JSON.parse(userCookie);

    if(allUser != null){
      allUser.forEach(element => {
        if(searchFriend != ""){
          if(element.username.includes(searchFriend)){
          arrayUser.push(element);
          }
        }else{
        arrayUser.push(element);
        }
      });
    }

    return (
    <>
      <div className={style.mainContainer}>
      <input type="text" placeholder="Recherche" className={style.searchBar} onChange={(searchFriend) =>setSearchFriend(searchFriend.target.value)}></input>
      {arrayUser && arrayUser.map((user) => (
        <ShowAmis userCookie={userInfo} friend={user} searchFriend={searchFriend} key={user._id}/>
      ))}
     </div>
    </>
    );
  } else {
    return <div className={style.mainContainer}>loading...</div>;
  }
}
