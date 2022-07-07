
import style from "../../styles/administration.module.css";
import { useEffect, useState } from "react";
import articleManager from "../utils/articleManager";
import ComponentArticle from "../home/ComponentArticle";

export default function Moderation() {
  let allArticle;
  allArticle = articleManager();

  useEffect(() => {
    if (window) { 
      window.sessionStorage.setItem("Page", "Moderation" );
    }
  }, []);


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
  );
  }else{
    return <>Loading...</>
  }
}
