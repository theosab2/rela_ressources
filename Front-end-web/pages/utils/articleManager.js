import { setCookies, getCookie, removeCookies } from "cookies-next";
import { useEffect, useState } from "react";

export default function allArticle(type) {

  const [allArticle, setAllArticle] = useState(null);
  if(type != null){
    try{
    const deleteArticle = async () =>
    fetch("/article/delete/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return true;
  }catch{
    return false
  }
  }

  const getArticle = async () =>
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
    getArticle();
  }, []);

  return allArticle;
}
