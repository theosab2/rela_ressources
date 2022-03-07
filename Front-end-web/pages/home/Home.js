import Navigation from "../Navigation";
import style from "../../styles/Home.module.css";
import Post from "../home/Post";
import { useState, useEffect } from "react";

export default function Home() {
  const [allArticle, setAllArticle] = useState(null);

  const getUser = async () =>
    fetch("http://localhost:3001/articles/all", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAllArticle(data.articles);
      });

  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <Navigation></Navigation>
      <div className={style.HomeContainer}>
        <div className={style.HomeSubContainer}>
          {allArticle &&
            allArticle.map((articleInfo) => (
              <Post
                allArticleDetail={articleInfo}
                articleTitle={articleInfo.articleName}
                articleUrl="/../public/Image/up.png"
                userId={articleInfo.articleUser}
              ></Post>
            ))}
        </div>
      </div>
    </>
  );
}
