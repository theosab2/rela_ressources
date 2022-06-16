import style from "../../styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import cookieManager from "../utils/cookieManager";

export default function Post(props) {
  const [article, setArticle] = useState(null);
  const [nbLike, setLike] = useState(null);
  const [nbDislike, setDislike] = useState(null);
  const userCookie = cookieManager();
  let userCookieJson = JSON.parse(userCookie);
  console.log(article)

  const getArticle = async () =>
      await fetch("http://localhost:3001/article/" + props.articleId, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setArticle(data);
          console.log(article)
  });

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
  
        async function modererArticle(id, bool) {
          let res = await fetch("http://localhost:3001/article/" + id, {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              article: {
                articleIsApproved: bool,
              },
            }),
          });
          res = await res.json();
        }
  
        const addFav = async(id) =>{
          userCookieJson.favorites.push(id);
          await fetch("http://localhost:3001/user/" + userCookieJson._id, {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user: {
                favorites: userCookieJson.favorites,
              },
            }),
          });
        }
  
        const getUser  = async (id) =>{
          await fetch("http://localhost:3001/user/"+id ,{
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              setUserInfo(data);
            });
          }
      


  useEffect(() => {
    getArticle();
  }, []);

  if(article != null){
    return (
      <div className={style.mainContainer}>
        <div className={style.articleContainer} key={article._id}>
          <div className={style.firstPartContainer}>
            <div className={style.firstInfo}>
              <div className={style.userInfoContainer}>
                <img src="/Image/connexion.png" className={style.userPicture}/>
                <div className={style.userPostInfoContainer}>
                  <div className={style.userName}>
                    
                  </div>
                  <div className={style.publicationDate}>Publication : Il y a 4h</div>
                </div>
              </div>
              <div className={style.articleTitle}>{article.title}</div>
            </div>
            <img src={article.image} className={style.articlePicture}/>
          </div>
          <div className={style.articleBody}>{article.description}</div>
          <div className={style.articleFooter}>
            <div className={style.articleRate}>
              <div>{article.articleNbLikes}</div>
              <img src="/Image/like.png"  onClick={() => upVote(article._id)}/>
              <div>{article.articleNbDislikes}</div>
              <img src="/Image/like.png" className={style.dislike} onClick={() => downVote(article._id)}/>
            </div>
            <div className={style.articleOption}>
              {userCookieJson.role == "admin" ?
              article.isApproved == true ?
              <img src="/Image/delete.png" className={style.warning} onClick={() => modererArticle(article._id,false)}/>
              :
              <img src="/Image/checkmark.png" className={style.warning} onClick={() => modererArticle(article._id,true)}/>
              : <></>}
              <img src="/Image/alert.png" className={style.warning}/>
              <img src="/Image/forward.png" className={style.forward}/>
              <img src="/Image/plus.png" className={style.add} onClick={() => addFav(article._id)}/>
              <button onClick={() => setId(article._id)}>
              <img src="/Image/comments.png" className={style.comment}/>
              </button>
            </div>
          </div>
        </div>
        <div className={style.articleContainer}>
          <div>
          <input type="text" placeholder="Commentaire"></input>
          <button>Valider</button>
          </div>
          <div>
            
          </div>
        </div>
      </div>
    );
    }else{
        return <>loading...</>
    }
}
