import { setCookies, getCookie, removeCookies } from "cookies-next";
import { useEffect, useState } from "react";

export default function cookieManager() {
  const [userCookie, setUserCookie] = useState(getCookie("token"));
  const [userData, setUserData] = useState(getCookie("token"));
  
  const getUserConnected = async () =>
    fetch("http://"+process.env.IP+":3001/user/" + JSON.parse(userCookie)._id, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
      });

  useEffect(() => {
    if (userCookie) {
      getUserConnected();
    }
  }, [userCookie]);

  
  return userData;
}
