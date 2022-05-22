import Navigation from "../Navigation";
import style from "../../styles/Home.module.css";
import Post from "../home/Post";
import { useState, useEffect } from "react";
import articleManager from "../utils/articleManager";
import Image from "next/image";

export default function Home() {
  const [nbLike, setLike] = useState(null);
  const [nbDislike, setDislike] = useState(null);
  const [id, setId] = useState(null);

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

  useEffect(function showPost(){
    if(id != null){
      if (window) { 
        window.sessionStorage.setItem("Page", "Comment" );
        window.sessionStorage.setItem("id", id );
      }
    }
  },[id]);
  
  async function upVote(id) {
    setLike(nbLike + 1);
    let res = await fetch("http://localhost:3001/article/" + id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        article: {
          articleNbLikes: nbLike + 1,
        },
      }),
    });
    res = await res.json();
  }

  async function downVote(id) {
    setDislike(nbDislike + 1);
    let res = await fetch("http://localhost:3001/article/" + id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        article: {
          articleNbDislikes: nbDislike + 1,
        },
      }),
    });
    res = await res.json();
  }
  return (
    <>
      <div className={style.mainContainer}>
        <input type="text" placeholder="Recherche" className={style.searchBar}></input>
        {allArticle &&
    allArticle
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
              <img src="/Image/like.png"  onClick={() => upVote(articleInfo._id)}/>
              <div>{articleInfo.articleNbDislikes}</div>
              
              <img src="/Image/like.png" className={style.dislike} onClick={() => downVote(articleInfo._id)}/>
            </div>
            <div className={style.articleOption}>
              <img src="/Image/alert.png" className={style.warning}/>
              <img src="/Image/forward.png" className={style.forward}/>
              <img src="/Image/plus.png" className={style.add}/>
              <button onClick={() => setId(articleInfo._id)}>
              <img src="/Image/comments.png" className={style.comment}/>
              </button>
            </div>
          </div>
        </div>
        ))}
     </div>
    </>
  );
}
