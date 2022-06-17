import { setCookies, getCookie, removeCookies } from "cookies-next";
import { useEffect, useState } from "react";

export default function allUser() {
  const [allUser, setAllUser] = useState(null);
  
  const getArticle = async () =>
    fetch("http://"+process.env.IP+":3001/users/all", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAllUser(data.users);
      });

  useEffect(() => {
    getArticle();
  }, []);
  return allUser;
}
