import { setCookies, getCookie, removeCookies } from "cookies-next";
import { useEffect, useState } from "react";

export default function allArticle(type) {

  const [allArticles, setAllArticles] = useState(null);
  try{
  const getArticle = async () =>
    fetch("http://"+process.env.IP+"/articles/all", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAllArticles(data.articles);
      });
  useEffect(() => {
    getArticle();
  }, []);
  }catch(e){
    console.log(e)
  }
  return allArticles;
}

