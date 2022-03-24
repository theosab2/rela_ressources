import style from "../../styles/crudPost.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Post(props) {
  const [user, setUser] = useState(null);

  const getUser = async () =>
    fetch(
      "http://localhost:3001/user/" + props.allArticleDetail.articleCreator,
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
        console.log(data);
      });

  useEffect(() => {
    getUser();
  }, []);

  async function upVote(id, bool) {
    let res = await fetch("http://localhost:3001/article/" + id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: {
          categoryIsActive: bool,
        },
      }),
    });
    res = await res.json();
  }

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
          <div>{props.allArticleDetail.articleDescription}</div>
          <div className={style.ArticleFooterRate}>
            <div className={style.rate}>
              <p>{props.allArticleDetail.articleNbLikes}</p>
              <div className={style.upVote}></div>

              <div className={style.downVote}></div>
              <p>{props.allArticleDetail.articleNbDislikes}</p>
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
      </div>
    );
  } else {
    return <>loading...</>;
  }
}
