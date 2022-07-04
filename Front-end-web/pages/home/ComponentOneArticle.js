import style from "../../styles/Home.module.css";
import cookieManager from "../utils/cookieManager";
import { useState, useEffect } from "react";

export default function ComponentOneArticle(props) {
    const [userInfo, setUserInfo] = useState(null);
    async function downVote(id) {
        setDislike(nbDislike + 1);
        let res = await fetch("http://"+process.env.IP+":3001/article/" + id, {
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
        let res = await fetch("http://"+process.env.IP+":3001/article/" + id, {
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
        let res = await fetch("http://"+process.env.IP+":3001/article/" + id, {
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
        await fetch("http://"+process.env.IP+":3001/user/" + userCookieJson._id, {
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
        await fetch("http://"+process.env.IP+":3001/user/"+id ,{
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

  const userCookie = cookieManager();

  useEffect(function showPost(){
    getUser(props.article.creator)
  },[]);

  if(userInfo != null){
    return (
        <>
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
              <div className={style.articleTitle}>{props.article.title}</div>
            </div>
            <img src={props.article.image} className={style.articlePicture}/>
          </div>
          <div className={style.articleBody}>{props.article.description}</div>
          {props.article.contents &&
    props.article.contents
      .map((content) => (
        <div className={style.articleBody} key={content._id}>{content.body}</div>
        ))}
          <div className={style.articleFooter}>
            <div className={style.articleRate}>
              <div>{props.article.articleNbLikes}</div>
              <img src="/Image/like.png"  onClick={() => upVote(props.article._id)}/>
              <div>{props.article.articleNbDislikes}</div>
              <img src="/Image/like.png" className={style.dislike} onClick={() => downVote(props.article._id)}/>
            </div>
            <div className={style.articleOption}>
              {userCookie.role == "admin" ?
              props.article.isApproved == true ?
              <img src="/Image/delete.png" className={style.warning} onClick={() => modererArticle(props.article._id,false)}/>
              :
              <img src="/Image/checkmark.png" className={style.warning} onClick={() => modererArticle(props.article._id,true)}/>
              : <></>}
              <img src="/Image/alert.png" className={style.warning}/>
              <img src="/Image/forward.png" className={style.forward}/>
              <img src="/Image/plus.png" className={style.add} onClick={() => addFav(props.article._id)}/>
              <button onClick={() => setId(props.article._id)}>
              <img src="/Image/comments.png" className={style.comment}/>
              </button>
            </div>
          </div>
        </>
    );
  }else{
    return <>Loading...</>
  }
}