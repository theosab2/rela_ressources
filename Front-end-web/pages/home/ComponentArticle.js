import style from "../../styles/Home.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import cookieManager from "../utils/cookieManager";
//import {IP} from "@env";

export default function ComponentArticle(props) {
    const [id, setId] = useState(null);
    const [nbLike, setLike] = useState(null);
    const [nbDislike, setDislike] = useState(null);
    const [user, setUser] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [approvedImg, setApprovedImg] = useState(props.articleInfo.isApproved);
    const [favImg,setFavImg] = useState(true)

    let cookie;
    cookie = cookieManager();

    const router = useRouter();

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

      useEffect(function showPost(){
        if(id != null){
          if (window) { 
            window.sessionStorage.setItem("Page", "Comment" );
            window.sessionStorage.setItem("id", id._id );
            router.reload(window.location.pathname)
          }
        }
      },[id]);
    

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
              "isApproved": bool,
            },
          }),
        });
        res = await res.json();
        setApprovedImg(bool)
      }

      const addFav = async(id) =>{
        cookie.favorites.push(id);
        await fetch("http://"+process.env.IP+":3001/user/" + cookie._id, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: {
              favorites: cookie.favorites,
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
    
        useEffect(function showPost(){
            getUser(props.articleInfo.creator)
            
          },[]);
    

    if(userInfo != null){
    
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
                </div>
              </div>
              <div className={style.articleTitle}>{props.articleInfo.title}</div>
            </div>
            <img src={props.articleInfo.image} className={style.articlePicture}/>
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
              {
              cookie != null?
              cookie.role == "Admin" ?
              approvedImg == true ?
              <img src="/Image/delete.png" className={style.warning} onClick={() => modererArticle(props.articleInfo._id,false)}/>
              :
              <img src="/Image/checkmark.png" className={style.warning} onClick={() => modererArticle(props.articleInfo._id,true)}/>
              : 
              <></> 
              :
              <></>
              }
              {/*<img src="/Image/alert.png" className={style.warning}/>
              <img src="/Image/forward.png" className={style.forward}/>*/}
              
              <img src="/Image/plus.png" className={style.add} onClick={() => addFav(props.articleInfo._id)} />
              <button onClick={() => setId(props.articleInfo)}>
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