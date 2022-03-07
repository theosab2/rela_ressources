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
            <Image src={"/../public/Image/up.png"} width={20} height={20} />
            <Image src={"/../public/Image/down.png"} width={20} height={20} />
          </div>

          {props.allArticleDetail.articleContent}

          <Image
            src={"/../public/Image/plus-solid.svg"}
            width={20}
            height={20}
          />
          <Link href={`../crudPost/${props.allArticleDetail.articleUser}`}>
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
