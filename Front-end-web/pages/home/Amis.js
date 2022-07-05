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

    async function searchUser (e) {
      let res = await fetch("http://"+process.env.IP+":3001/users/query" ,{
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "username": "[LIKE][CI]"+e.target.value,
        }),
      })
      res = await res.json();
      setSearchFriend(res);
    }
  
    if(searchFriend.length != 0){
      if(searchFriend.users.length != 0){
        allUser = searchFriend.users;
      }
    }

    if(allUser != null){
      allUser.forEach(element => {
        arrayUser.push(element);
      });
    }


    return (
    <>
      <div className={style.mainContainer}>
      <input type="text" placeholder="Recherche" className={style.searchBar} onChange={(e) => searchUser(e)}></input>
      {arrayUser && arrayUser.map((user) => (
        <ShowAmis userCookie={userCookie} friend={user} searchFriend={searchFriend} key={user._id}/>
      ))}
     </div>
    </>
    );
  } else {
    return <div className={style.mainContainer}>loading...</div>;
  }
}
