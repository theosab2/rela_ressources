import Navigation from "../Navigation";
import style from "../../styles/Home.module.css";
import Post from "../home/Post";
import { useState, useEffect } from "react";
import articleManager from "../utils/articleManager";
import Image from "next/image";
import ComponentArticle from "./ComponentArticle";
import cookieManager from "../utils/cookieManager";

export default function Home() {

  const [searchAllArticle,setSearchAllArticle] = useState(null);
  let articleApproved = [];
  
  useEffect(() => {
    if (window) { 
      window.sessionStorage.setItem("Page", "Accueil" );
    }
    
  }, []);

  let allArticle = articleManager()

  async function searchArticle (e) {
    console.log(e.target.value)
    let res = await fetch("http://"+process.env.IP+":3001/articles/query" ,{
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "title": "[LIKE][CI]"+e.target.value,
      }),
    })
    res = await res.json();
    setSearchAllArticle(res);
    console.log("searchAllArticle ->",searchAllArticle)
  }

  if(searchAllArticle != null){
    if(searchAllArticle.articles.length != 0){
    allArticle = searchAllArticle.articles;
    }
  }

  if(allArticle != null){
    console.log("allArticle ->",searchAllArticle)
    allArticle.forEach(element => {
      if(element.isApproved == true){
        console.log(element.isApproved)
      articleApproved.push(element)
      }
    }); 

  return (
    <>
      <div className={style.mainContainer}>
        <input type="text" placeholder="Recherche" onChange={(e) => searchArticle(e)} className={style.searchBar}></input>
        {articleApproved &&
        articleApproved
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
