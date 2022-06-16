import style from "../../styles/Home.module.css";
import { useState, useEffect } from "react";
import cookieManager from "../utils/cookieManager";

export default function ComponentArticle(props) {

    const [nbLike, setLike] = useState(null);
    const [nbDislike, setDislike] = useState(null);
    const [user, setUser] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const userCookie = cookieManager();
    let userCookieJson = JSON.parse(userCookie);

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
    
        useEffect(function showPost(){
            getUser(props.articleInfo.creator)
          },[]);
    

    if(userInfo != null){
      console.log(userCookieJson)
    return (
        <div className={style.articleContainer} key={props.articleInfo._id}>
          <div className={style.firstPartContainer}>
            <div className={style.firstInfo}>
              <div className={style.userInfoContainer}>
                <img src="/Image/connexion.png" className={style.userPicture}/>
                <div className={style.userPostInfoContainer}>
                  <div className={style.userName}>
                    {userInfo.username}
                  </div>
                  <div className={style.publicationDate}>Publication : Il y a 4h</div>
                </div>
              </div>
              <div className={style.articleTitle}>{props.articleInfo.title}</div>
            </div>
            <img src={props.articleInfo.articleImage} className={style.articlePicture}/>
          </div>
          <div className={style.articleBody}>{props.articleInfo.description}</div>
          <div className={style.articleFooter}>
            <div className={style.articleRate}>
              <div>{props.articleInfo.articleNbLikes}</div>
              <img src="/Image/like.png"  onClick={() => upVote(props.articleInfo._id)}/>
              <div>{props.articleInfo.articleNbDislikes}</div>
              <img src="/Image/like.png" className={style.dislike} onClick={() => downVote(props.articleInfo._id)}/>
            </div>
            <div className={style.articleOption}>
              {userCookieJson.role == "admin" ?
              props.articleInfo.isApproved == true ?
              <img src="/Image/delete.png" className={style.warning} onClick={() => modererArticle(props.articleInfo._id,false)}/>
              :
              <img src="/Image/checkmark.png" className={style.warning} onClick={() => modererArticle(props.articleInfo._id,true)}/>
              : <></>}
              <img src="/Image/alert.png" className={style.warning}/>
              <img src="/Image/forward.png" className={style.forward}/>
              <img src="/Image/plus.png" className={style.add} onClick={() => addFav(props.articleInfo._id)}/>
              <button onClick={() => setId(props.articleInfo._id)}>
              <img src="/Image/comments.png" className={style.comment}/>
              </button>
            </div>
          </div>
        </div>
    );
    }else{
        return(<>loading...</>)
    }
}