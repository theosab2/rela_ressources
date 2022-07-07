import style from "../../styles/crudPost.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Post(props) {
  const [user, setUser] = useState(null);
  const [nbLike, setLike] = useState(null);
  const [nbDislike, setDislike] = useState(null);

  const getUser = async () =>
    fetch(
      "http://"+process.env.IP+"/user/" + props.allArticleDetail.articleCreator,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLike(props.allArticleDetail.articleNbLikes);
        setDislike(props.allArticleDetail.articleNbDislikes);
      });

  useEffect(() => {
    getUser();
  }, []);

  async function upVote(id) {
    setLike(nbLike + 1);
    let res = await fetch("http://"+process.env.IP+"/article/" + id, {
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
    let res = await fetch("http://"+process.env.IP+"/article/" + id, {
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

  function ajouterFav(event) {
    console.log(event);
  }

  if (user != null) {
    return (
      <div className={style.ArticleContainer}>
        <div className={style.ArticleSubContainer}>
          <div className={style.ArticleHeader}>
            <div>
              <Image src={"/../public/Image/up.png"} width={40} height={40} />
              <p>{user.username}</p>
            </div>
            <h2>{props.articleTitle}</h2>
          </div>
          <img
            src={
              props.allArticleDetail.articleImage &&
              props.allArticleDetail.articleImage
                ? props.allArticleDetail.articleImage
                : "/Image/Bateau_2.jpg"
            }
            className={style.ArticleImageContainer}
          />
        </div>

        <div className={style.ArticleFooter}>
          <div>{props.allArticleDetail.articleDescription}</div>
          <div className={style.ArticleFooterRate}>
            <div className={style.rate}>
              <p>{nbLike}</p>
              <div
                className={style.upVote}
                onClick={() => upVote(props.allArticleDetail._id)}
              ></div>

              <div
                className={style.downVote}
                onClick={() => downVote(props.allArticleDetail._id)}
              ></div>
              <p>{nbDislike}</p>
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
              <a>
                <Image
                  src={"/../public/Image/commentaire.png"}
                  width={40}
                  height={35}
                  className={style.LinkPost}
                />
              </a>
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
      </div>
    );
  } else {
    return <>loading...</>;
  }
}
