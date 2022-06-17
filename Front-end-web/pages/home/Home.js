import Navigation from "../Navigation";
import style from "../../styles/Home.module.css";
import Post from "../home/Post";
import { useState, useEffect } from "react";
import articleManager from "../utils/articleManager";
import Image from "next/image";
import ComponentArticle from "./ComponentArticle";

export default function Home() {
  

  useEffect(() => {
    if (window) { 
      window.sessionStorage.setItem("Page", "Accueil" );
    }
  }, []);

  let allArticle;
  let articlePopular = [];
  allArticle = articleManager();

  for (let i = 0; i < 5; i++) {
    if (allArticle != null) {
      articlePopular.push(allArticle[i]);
    }
  }

  if(allArticle != null){
  return (
    <>
      <div className={style.mainContainer}>
        <input type="text" placeholder="Recherche" className={style.searchBar}></input>
        {allArticle &&
        allArticle
        .reverse()
        .map((articleInfo) => (
        <ComponentArticle articleInfo={articleInfo} key={articleInfo._id}/>
        ))}
     </div>
    </>
  )}else{
    return <div>loading...</div>
  }
}
