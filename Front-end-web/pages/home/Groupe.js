import Navigation from "../Navigation";
import style from "../../styles/Home.module.css";
import Image from "next/dist/client/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import utils from "../utils";
import cookieManager from "../utils/cookieManager";
import articleManager from "../utils/articleManager";
import {useRef} from 'react';
import groupManager from "../utils/groupManager";
import ComponentJoinGroupe from "./ComponentJoinGroupe";

export default function Groupe() {
  const [showCreate,setShowCreate] = useState(false);
  const groupName = useRef(null);

  useEffect(() => {
    if (window) { 
      window.sessionStorage.setItem("Page", "Groupe" );
    }
  }, []);

  const userCookie = cookieManager();
  let allGroup = groupManager();
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
  

    

    if(allGroup != null){
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
      {allGroup && allGroup.map((group) => (
        <ComponentJoinGroupe group={group} key={group._id}/>
    ))};
     </div>
    </>
    );
  } else {
    return <div>loading...</div>;
  }
}
