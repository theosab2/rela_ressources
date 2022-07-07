import { setCookies, getCookie, removeCookies } from "cookies-next";
import { useEffect, useState } from "react";
import Moderation from "./administration/Moderation";
export default function utils() {
  const [userCookie, setUserCookie] = useState(getCookie("token"));
  const [isLoading, setLoading] = useState(true);
  let [pageAdmin, setPagAdmin] = useState("");

  useEffect(() => {
    if (userCookie) {
      setLoading(true);
      setUserCookie(userCookie);
      setLoading(false);
    }
  }, [userCookie]);

  if (isLoading) {
    return false;
  } else {
    return userCookie;
  }
}

export function allArticle() {
  const [allArticle, setAllArticle] = useState(null);
  const getArticle = async () =>
    fetch("http://"+process.env.IP+"/articles/all", {
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
