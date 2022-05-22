import style from "../../styles/crudPost.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Post(props) {
  const [article, setArticle] = useState(null);
  const [nbLike, setLike] = useState(null);
  const [nbDislike, setDislike] = useState(null);
  console.log(props.id);
  useEffect(() => {
    const getArticle = async () =>
      await fetch("http://10.176.131.87:3001/article/" + props.articleId, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setArticle(data);
        });
    getArticle();
  }, []);

    return (
      <>
      {article &&
      article
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
              <img src="/Image/comments.png" className={style.comment} onClick={() => commentArticle(articleInfo._id)}/>
            </div>
          </div>
        </div>
        ))}
      </>
    );
}
