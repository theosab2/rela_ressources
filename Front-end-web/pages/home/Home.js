import Navigation from "../Navigation";
import style from "../../styles/Home.module.css";
import Post from "../home/Post";
import { useState, useEffect } from "react";
import articleManager from "../utils/articleManager";

export default function Home() {
  let allArticle;
  allArticle = articleManager();

  return (
    <>
      <Navigation></Navigation>
      <div className={style.HomeContainer}>
        <div className={style.HomeSubContainer}>
          {allArticle &&
            allArticle.map((articleInfo) => (
              <Post
                allArticleDetail={articleInfo}
                articleTitle={articleInfo.articleName}
                articleUrl="/../public/Image/up.png"
                userId={articleInfo.articleUser}
              ></Post>
            ))}
        </div>
      </div>
    </>
  );
}
