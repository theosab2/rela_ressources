import style from "../../styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import cookieManager from "../utils/cookieManager";
import ComponentShowComment from "../home/ComponentShowComment";
import ComponentOneArticle from "../home/ComponentOneArticle";
 
export default function Post(props) {
  const [article, setArticle] = useState(null);
  const [nbLike, setLike] = useState(null);
  const [nbDislike, setDislike] = useState(null);
  const userCookie = cookieManager();
  let userCookieJson = JSON.parse(userCookie);


  const getArticle = async () =>
      await fetch("http://"+process.env.IP+":3001/article/" + props.articleId, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setArticle(data);

  });
      
  useEffect(() => {

    getArticle();
  }, []);

  if(article != null){
    return (
      <div className={style.mainContainer}>
        <div className={style.articleContainer} key={article._id}>
          <ComponentOneArticle article={article}/>
        </div>
        <div className={style.articleContainer}>
          <ComponentShowComment articleId={article._id}/>
        </div>
      </div>
    );
    }else{
        return <>loading...</>
    }
}
