import { setCookies, getCookie, removeCookies } from "cookies-next";
import { useEffect, useState } from "react";

function utils() {
  const [userCookie, setUserCookie] = useState(getCookie("token"));
  const [isLoading, setLoading] = useState(true);

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

export default utils;
