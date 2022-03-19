import { useRouter } from "next/router";
import Navigation from "../Navigation";
import style from "../../styles/crudPost.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function (props) {
  const router = useRouter();
  const { showPost } = router.query;
  const [user, setUser] = useState(null);

  const display = async () => {
    const res = await fetch("http://localhost:3001/comment/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: {
          commentArticle: "test",
          commentContent: "test",
          commentUser: "61e180f2f42a5ffe793e0ec8",
        },
      }),
    });
    res = await res.json();
    if (res.status != "SUCESS") {
      console.log("Erreur");
    } else {
      console.log("Réussite");
    }
  };

  const getUser = async () =>
    fetch("http://localhost:3001/user/" + showPost, {
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
  }, [showPost]);

  if (user != null) {
    return (
      <>
        <Navigation></Navigation>
        <div className={style.pageComment}>
          <div className={style.empty}></div>
          <div className={style.DetailArticle}>
            <div className={style.ArticleContainerComment}>
              <div className={style.ArticleSubContainerComment}>
                <div className={style.ArticleHeader}>
                  <div className={style.userWhoCreatePost}>
                    <Image
                      src={"/../public/Image/up.png"}
                      width={40}
                      height={10}
                    />
                    <p>{user.username}</p>
                  </div>
                  <div className={style.ArticleHeaderTitle}>
                    {props.articleTitle}
                  </div>
                </div>
                <img
                  src="/Image/bateau_2.jpg"
                  className={style.ArticleImageContainerComment}
                />
              </div>
              <div className={style.ArticleFooter}>
                <div>
                  <Image
                    src={"/../public/Image/up.png"}
                    width={20}
                    height={20}
                  />
                  <Image
                    src={"/../public/Image/down.png"}
                    width={20}
                    height={20}
                  />
                </div>

                <Image
                  src={"/../public/Image/plus-solid.svg"}
                  width={20}
                  height={20}
                />
                <Image
                  src={"/../public/Image/commentaire.png"}
                  width={40}
                  height={35}
                  className={style.LinkPost}
                />
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
              <form className={style.CommentInputContainer}>
                <input type="text"></input>
                <input type="submit" value="valider" onClick={display}></input>
              </form>
            </div>
          </div>
          <div className={style.empty}></div>
        </div>
      </>
    );
  } else {
    return <>loading...</>;
  }
}
