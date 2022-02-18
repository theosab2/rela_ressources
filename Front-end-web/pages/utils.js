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
