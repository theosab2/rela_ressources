import Navigation from "../Navigation";
import style from "../../styles/Home.module.css";
import Image from "next/dist/client/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import utils from "../utils";
import cookieManager from "../utils/cookieManager";
import articleManager from "../utils/articleManager";
import {useRef} from 'react';

export default function Groupe() {
  let allArticle;
  let array = [];
  const [showCreate,setShowCreate] = useState(false);
  const groupName = useRef(null);

  useEffect(() => {
    if (window) { 
      window.sessionStorage.setItem("Page", "Groupe" );
    }
  }, []);

  allArticle = articleManager();
  const userCookie = cookieManager();

  if (allArticle != null) {

    allArticle.forEach((element) => {
      if (element.articleCreator == userCookie._id) {
        array.push(element);
      }
    });

    async function createGroupe(){
      const res = await fetch("http://"+process.env.IP+":3001/relation/create", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          relation:{
              name:groupName.current.value,
              UT_id:"62b7400bba0f3ee3c805af6c",
              user_ids:[userCookie._id]
          },
        }),
      });
    }

    console.log(allArticle);
    return (
      <>
      <div className={style.mainContainer}>
      <div className={style.searchBarContainer}>
      <input type="text" placeholder="Recherche" className={style.searchBar}></input>
      <button className={style.btnCreateGroupe} onClick={() => setShowCreate(!showCreate)}>+</button>
      </div>
      {showCreate ?
      <div className={style.createGroupeContainer}>
        <p>Créer un groupe</p>
        <label>Nom du groupe</label>
        <div>
          <input ref={groupName} type="text"></input>
        </div>
        <button onClick={() => createGroupe()} >Valider</button>
      </div>
      :""}
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
