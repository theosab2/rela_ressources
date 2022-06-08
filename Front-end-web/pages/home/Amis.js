import Navigation from "../Navigation";
import style from "../../styles/Home.module.css";
import Image from "next/dist/client/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import utils from "../utils";
import cookieManager from "../utils/cookieManager";
import articleManager from "../utils/articleManager";
import userManager from "../utils/userManager";

export default function Amis() {
  const [searchFriend, setSearchFriend] = useState("");
  let allUser = null;
  let allArticle;
  let array = [];

  useEffect(() => {
    if (window) { 
      window.sessionStorage.setItem("Page", "Amis" );
    }
  }, []);

  allArticle = articleManager();
  const userCookie = cookieManager();

  allUser = userManager();

  if (allUser != null) {
    const userInfo = JSON.parse(userCookie);

    allUser.forEach((element) => {
      if (element.articleCreator == userInfo._id) {
        array.push(element);
      }
    });

    return (
      <>
      <div className={style.mainContainer}>
      <input type="text" placeholder="Recherche" className={style.searchBar} onChange={(searchFriend) =>
                setSearchFriend(searchFriend.target.value)}></input>
      {allUser && allUser.map((user) => (
        <div className={style.abonnementContainer}>
        <div>
          <img src="/Image/connexion.png"/>
          <p>{user.username}</p>
          </div>
          <div>
          <img src="/Image/user.png"/>
          <p>{user.relation_ids.length}</p>
            </div>
            <img src="/Image/comment.png"/>
          <button>
              Désabonner
          </button>
        </div>
      ))}
     </div>
    </>
    );
  } else {
    return <div>loading...</div>;
  }
}
