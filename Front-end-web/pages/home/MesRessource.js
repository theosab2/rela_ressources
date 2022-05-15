import Navigation from "../Navigation";
import style from "../../styles/Home.module.css";
import Image from "next/dist/client/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import utils from "../utils";
import cookieManager from "../utils/cookieManager";
import articleManager from "../utils/articleManager";
import { useRouter } from 'next/router'

export default function MesRessource() {
  let allArticle;
  let array = [];
  const router = useRouter()

  useEffect(() => {
    if (window) { 
      window.sessionStorage.setItem("Page", "Historique" );
    }
  }, []);
  
    
    allArticle = articleManager();
    const userCookie = cookieManager();

    if (allArticle != null) {
      const userInfo = JSON.parse(userCookie);

      allArticle.forEach((element) => {
        if (element.articleCreator == userInfo._id) {
          array.push(element);
        }
      });

    function  deleteArticle(id){
      console.log(id);
        fetch("http://localhost:3001/article/delete/"+id, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      router.reload(window.location.pathname)
    }

    return (
      <>
      <div className={style.mainContainer}>
        <div className={style.filterContainer}>
          <div>
          <p> Trier par date</p><Image
            src={"/../public/Image/sort.png"}
            atl={"icon connexion"}
            width={25}
            height={25}
          />
          </div>
          <div>
          <p> Trier par nom</p><Image
            src={"/../public/Image/sort_letter.png"}
            atl={"icon connexion"}
            width={25}
            height={25}
          />
          </div>
          <div>
          <p> Trier par avis</p><Image
            src={"/../public/Image/fire.png"}
            atl={"icon connexion"}
            width={25}
            height={25}
          />
          </div>
        </div>
        {array &&
      array
      .reverse()
      .map((articleInfo) => (
        <div className={style.articleContainer} key={articleInfo._id}>
          <div className={style.firstPartContainer}>
            <div className={style.firstInfo}>
              <div className={style.userInfoContainer}>
                <img src="/Image/connexion.png" className={style.userPicture}/>
                <div className={style.userPostInfoContainer}>
                  <div className={style.userName}>{articleInfo.articleCreator}</div>
                  <div className={style.publicationDate}>Publication : Il y a 4h</div>
                </div>
              </div>
              <div className={style.articleTitle}>{articleInfo.articleTitle}</div>
            </div>
            <img src={articleInfo.articleImage} className={style.articlePicture}/>
          </div>
          <div className={style.articleBody}>{articleInfo.articleDescription}</div>
          <div className={style.articleFooter}>
            <div className={style.articleRate}>
              <div>{articleInfo.articleNbLikes}</div>
              <img src="/Image/like.png" />
              <div>{articleInfo.articleNbDislikes}</div>
              <img src="/Image/like.png" className={style.dislike}/>
            </div>
            <div className={style.articleOption}>
              <img src="/Image/delete.png" onClick={() => {deleteArticle(articleInfo._id)}}/>
              <p>{articleInfo.id}</p>
              <img src="/Image/setting.png" />
            </div>
            <div className={style.articleOption}>
              <img src="/Image/alert.png" />
              <img src="/Image/forward.png" />
              <img src="/Image/plus.png" />
              <img src="/Image/comments.png" />
            </div>
          </div>
        </div>
      ))}
     </div>
    </>
    );
  } else {
    return <div>loading...</div>;
  }
}
