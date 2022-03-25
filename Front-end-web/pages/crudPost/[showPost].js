import { useRouter } from "next/router";
import Navigation from "../Navigation";
import style from "../../styles/crudPost.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import articleManager from "../utils/articleManager";
import utils from "../utils/cookieManager";

export default function (props) {
  const router = useRouter();
  const { showPost } = router.query;
  //let user;
  const [user, setUser] = useState(null);
  const [article, setArticle] = useState(null);
  const [allComment, setAllComment] = useState(null);
  const [nbLike, setLike] = useState(null);
  const [nbDislike, setDislike] = useState(null);
  const [comment, setComment] = useState(null);
  const userCookie = utils();

  let allArticle;
  let articlePopular = [];
  allArticle = articleManager();
  for (let i = 0; i < 5; i++) {
    if (allArticle != null) {
      articlePopular.push(allArticle[i]);
    }
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

  function ajouterFav(event) {
    console.log(event);
  }

  function writeComment(event) {
    setComment(event.target.value);
  }

  async function addComment() {
    console.log(JSON.parse(userCookie)._id);
    console.log(article._id);
    console.log(comment);
    let res = await fetch("http://10.176.131.87:3001/comment/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: {
          commentCreator: JSON.parse(userCookie)._id,
          commentArticle: article._id,
          commentContent: comment,
        },
      }),
    });

    res = await res.json();
  }

  useEffect(() => {
    const getArticle = async () =>
      await fetch("http://10.176.131.87:3001/article/" + showPost, {
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
  }, [showPost]);

  useEffect(() => {
    const getComment = async () =>
      await fetch("http://10.176.131.87:3001/comments/query", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          commentArticle: showPost,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setAllComment(data);
        });
    getComment();
  }, [showPost]);

  if (
    article &&
    article.message != "une erreur est survenue" &&
    allComment != null
  ) {
    console.log(allComment);
    return (
      <>
        <Navigation></Navigation>
        <div className={style.HomeContainer}>
          <div className={style.HomeContainerPopular}>
            <div className={style.HomeContainerPopularHeader}>
              Les plus populaire
            </div>

            <div className={style.HomeContainerPopularContent}>
              <table>
                <tbody>
                  {articlePopular &&
                    articlePopular.map((articlePopular) => (
                      <tr key={articlePopular._id}>
                        <td>
                          <p>{articlePopular.articleTitle}</p>
                        </td>
                        <td>
                          <Image
                            src={"/../public/Image/Bateau_2.jpg"} // Route of the image file
                            height={40} // Desired size with correct aspect ratio
                            width={40} // Desired size with correct aspect ratio
                            alt="Image profil"
                            className={style.imageProfil}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className={style.HomeSubContainer}>
            <div className={style.ArticleContainer}>
              <div className={style.ArticleSubContainer}>
                <div className={style.ArticleHeader}>
                  <div>
                    <Image
                      src={"/../public/Image/up.png"}
                      width={40}
                      height={40}
                    />
                    <p>{article.articleCreator}</p>
                  </div>
                  <h2>{article.articleTitle}</h2>
                </div>
                <img
                  src={
                    article.articleImage && article.articleImage
                      ? article.articleImage
                      : "/Image/Bateau_2.jpg"
                  }
                  className={style.ArticleImageContainer}
                />
              </div>

              <div className={style.ArticleFooter}>
                <div>{article.articleDescription}</div>
                <div className={style.ArticleFooterRate}>
                  <div className={style.rate}>
                    <p>{nbLike}</p>
                    <div
                      className={style.upVote}
                      onClick={() => upVote(article._id)}
                    ></div>

                    <div
                      className={style.downVote}
                      onClick={() => downVote(article._id)}
                    ></div>
                    <p>{nbDislike}</p>
                  </div>

                  {article.articleContent}

                  <Image
                    className={style.ajoutFav}
                    src={"/../public/Image/plus-solid.svg"}
                    width={25}
                    height={25}
                    onClick={ajouterFav}
                  />
                  <Link href={`../crudPost/${article._id}`}>
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
              <div className={style.commentContainer}>
                <p>Ajouter un commentaire</p>

                <input type="text" onChange={writeComment}></input>

                <input
                  type="submit"
                  value="valider"
                  onClick={addComment}
                ></input>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <>loading...</>;
  }
}
