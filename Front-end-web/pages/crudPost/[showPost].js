import { useRouter } from "next/router";
import Navigation from "../Navigation";
import style from "../../styles/crudPost.module.css";
import Image from "rc-image";
import { useState, useEffect } from "react";

export default function (props) {
  const router = useRouter();
  const { showPost } = router.query;
  const [userInfo, setUserInfo] = useState(null);

  const getUser = async () =>
    fetch("http://localhost:3001/user/:id", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data);
        console.log(data);
      });

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Navigation></Navigation>
      <div className={style.pageCreate}>
        <div className={style.empty}></div>
        <div className={style.DetailArticle}>
          <div className={style.ArticleContainer}>
            {showPost}
            <div className={style.ArticleSubContainer}>
              <img
                src="/Image/bateau_2.jpg"
                className={style.ArticleImageContainer}
              />
            </div>
            <div className={style.ArticleFooter}>
              <div>Article titre</div>
            </div>
          </div>
          <div className={style.commentContainer}>
            <p>Ajouter un commentaire</p>
            <input type="text"></input>
          </div>
        </div>
        <div className={style.empty}></div>
      </div>
    </>
  );
}
