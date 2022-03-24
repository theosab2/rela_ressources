import style from "../../styles/crudPost.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Post(props) {
  const [user, setUser] = useState(null);

  const getUser = async () =>
    fetch("http://localhost:3001/user/" + props.allArticleDetail.articleUser, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        console.log(data);
      });

  useEffect(() => {
    getUser();
  }, []);

  function ajouterFav(event) {
    console.log(event);
  }

  function upVote(event) {
    console.log(event);
  }

  function downVote(event) {
    console.log(event);
  }

  if (user != null) {
    return (
      <div className={style.ArticleContainer}>
        <div className={style.ArticleSubContainer}>
          <div className={style.ArticleHeader}>
            <div className={style.userWhoCreatePost}>
              <Image src={"/../public/Image/up.png"} width={40} height={10} />
              <p>{user.username}</p>
            </div>
            <div className={style.ArticleHeaderTitle}>{props.articleTitle}</div>
          </div>
          <img
            src="/Image/bateau_2.jpg"
            className={style.ArticleImageContainer}
          />
        </div>
        <div className={style.ArticleFooter}>
          <div>
            <Image
              src={"/../public/Image/up.png"}
              width={25}
              height={25}
              onClick={upVote}
              className={style.upVote}
            />
            <Image
              src={"/../public/Image/down.png"}
              width={25}
              height={25}
              onClick={downVote}
              className={style.downVote}
            />
          </div>

          {props.allArticleDetail.articleContent}

          <Image
            className={style.ajoutFav}
            src={"/../public/Image/plus-solid.svg"}
            width={25}
            height={25}
            onClick={ajouterFav}
          />
          <Link href={`../crudPost/${props.allArticleDetail._id}`}>
            <Image
              src={"/../public/Image/commentaire.png"}
              width={40}
              height={35}
              className={style.LinkPost}
            />
          </Link>
          {props.articleProfilUrl && (
            <div className={style.profilPostContainer}>
              <Image
                src={props.articleProfilUrl}
                width={50}
                height={50}
                className={style.profilPost}
              />
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return <>loading...</>;
  }
}
