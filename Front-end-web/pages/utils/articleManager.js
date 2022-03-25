import { setCookies, getCookie, removeCookies } from "cookies-next";
import { useEffect, useState } from "react";

export default function allArticle() {
  const [allArticle, setAllArticle] = useState(null);
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