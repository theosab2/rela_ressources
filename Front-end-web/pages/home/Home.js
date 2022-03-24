import Navigation from "../Navigation";
import style from "../../styles/Home.module.css";
import Post from "../home/Post";
import { useState, useEffect } from "react";
import articleManager from "../utils/articleManager";
import Image from "next/image";

export default function Home() {
  let allArticle;
  let articlePopular = [];
  allArticle = articleManager();
  for (let i = 0; i < 5; i++) {
    if (allArticle != null) {
      articlePopular.push(allArticle[i]);
    }
  }
  return (
    <>
      <Navigation></Navigation>
      <div className={style.HomeContainer}>
        <div className={style.HomeContainerPopular}>
          <div className={style.HomeContainerPopularHeader}>
            Les plus populaire
          </div>

          <div className={style.HomeContainerPopularContent}>
            <table>
              <tbody>
                {articlePopular &&
                  articlePopular.map((articlePopular) => (
                    <tr>
                      <td>
                        <p>{articlePopular.articleTitle}</p>
                      </td>
                      <td>
                        <Image
                          src={"/../public/Image/Bateau_2.jpg"} // Route of the image file
                          height={40} // Desired size with correct aspect ratio
                          width={40} // Desired size with correct aspect ratio
                          alt="Image profil"
                          className={style.imageProfil}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className={style.HomeSubContainer}>
          <div className={style.HomeSearchBar}>
            <input type="search" placeholder="Rechercher"></input>
            <input type="button" id="search"></input>
          </div>
          <div className={style.HomeSearchBarFilter}>
            <p>Nouveau</p>
            <input type="button" className={style.HomeSearchBarNew}></input>
            <p>Populaire</p>
            <input type="button" className={style.HomeSearchBarPopular}></input>
            <p>En hausse</p>
            <input
              type="button"
              className={style.HomeSearchBarIncrease}
            ></input>
          </div>
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
              ))}
        </div>
      </div>
    </>
  );
}
