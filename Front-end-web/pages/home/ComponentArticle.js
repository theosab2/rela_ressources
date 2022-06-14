import style from "../../styles/Home.module.css";
import { useState, useEffect } from "react";

export default function ComponentArticle(props) {

    const [nbLike, setLike] = useState(null);
    const [nbDislike, setDislike] = useState(null);
    const [user, setUser] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

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
        console.log(userInfo)
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
              <img src="/Image/alert.png" className={style.warning}/>
              <img src="/Image/forward.png" className={style.forward}/>
              <img src="/Image/plus.png" className={style.add}/>
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