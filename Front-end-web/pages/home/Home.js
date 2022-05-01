import Navigation from "../Navigation";
import style from "../../styles/Home.module.css";
import Post from "../home/Post";
import { useState, useEffect } from "react";
import articleManager from "../utils/articleManager";
import Image from "next/image";

export default function Home() {
  /*let allArticle;
  let articlePopular = [];
  allArticle = articleManager();
  for (let i = 0; i < 5; i++) {
    if (allArticle != null) {
      articlePopular.push(allArticle[i]);
    }
  }

  {allArticle &&
    allArticle
      .reverse()
      .map((articleInfo) => (
        <Post
          key={articleInfo._id}
          allArticleDetail={articleInfo}
          articleTitle={articleInfo.articleTitle}
          articleUrl="/../public/Image/up.png"
          userId={articleInfo.articleCreator}
        ></Post>
      ))}*/
  return (
    <>
      <div className={style.mainContainer}>
        <input type="text" placeholder="Recherche" className={style.searchBar}></input>
        <div className={style.articleContainer}>
          <div className={style.firstPartContainer}>
            <div className={style.firstInfo}>
              <div className={style.userInfoContainer}>
                <img src="/Image/connexion.png" className={style.userPicture}/>
                <div className={style.userPostInfoContainer}>
                  <div className={style.userName}>JeanMichelle</div>
                  <div className={style.publicationDate}>Publication : Il y a 4h</div>
                </div>
              </div>
              <div className={style.articleTitle}>Je suis un jolie titre</div>
            </div>
            <img src="/Image/Bateau_2.jpg" className={style.articlePicture}/>
          </div>
          <div className={style.articleBody}>Je suis une courte description de ce qui se trouve sur l’image dans le bas de la ressource et il y a une faute d’orthographe</div>
          <div className={style.articleFooter}>
            <div className={style.articleRate}>
              <div>235</div>
              <img src="/Image/like.png" className={style.like}/>
              <div>156</div>
              <img src="/Image/like.png" className={style.dislike}/>
            </div>
            <div className={style.articleOption}>
              <img src="/Image/alert.png" className={style.warning}/>
              <img src="/Image/forward.png" className={style.forward}/>
              <img src="/Image/plus.png" className={style.add}/>
              <img src="/Image/comments.png" className={style.comment}/>
            </div>
          </div>
        </div>
     </div>
    </>
  );
}
