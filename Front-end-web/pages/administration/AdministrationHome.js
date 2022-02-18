import Navigation from "../Navigation";
import { setCookies, getCookie, removeCookies } from "cookies-next";
import style from "../../styles/administration.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import Moderation from "./Moderation";
import AdminRole from "./AdminRole";
import utils from "../utils";
import AdminRoleModif from "./AdminRoleModif";

export default function () {
  let [adminPage, setAdminPage] = useState("");

  function handleChange(newValue) {
    console.log(newValue);
    setAdminPage((adminPage = "AdminRoleModif"));
  }

  function pageRenderAdmin() {
    switch (adminPage) {
      case "Moderation":
        return <Moderation></Moderation>;
        break;
      case "AdminRole":
        return (
          <AdminRole value={adminPage} onChange={handleChange}></AdminRole>
        );
        break;
      case "AdminRoleModif":
        return <AdminRoleModif></AdminRoleModif>;
        break;
      case "jesaispasencore":
        return <></>;
        break;
      default:
        return <Moderation></Moderation>;
    }
  }
  const userCookie = utils();
  if (userCookie != false) {
    return (
      <>
        <Navigation></Navigation>
        <div className={style.pageCreate}>
          <div className={style.moderationMenu}>
            <button onClick={() => setAdminPage((adminPage = "Moderation"))}>
              Modération du contenu
            </button>
            <button onClick={() => setAdminPage((adminPage = "AdminRole"))}>
              Modifier les rôles
            </button>

            <button></button>
            <button></button>
          </div>
          <div className={style.createContainer}>{pageRenderAdmin("je")}</div>
          <div className={style.empty}></div>
        </div>
      </>
    );
  } else {
    return <>Loading...</>;
  }
}
