import Navigation from "../Navigation";
import { setCookies, getCookie, removeCookies } from "cookies-next";
import style from "../../styles/administration.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import Moderation from "./Moderation";
import AdminRole from "./AdminRole";
import utils from "../utils";
import AdminRoleModif from "./AdminRoleModif";
import ModerationUser from "./ModerationUser";
import AjouterCategorie from "./AjouterCategorie";

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
      case "ModerationUser":
        return <ModerationUser></ModerationUser>;
        break;
      case "AjouterCategorie":
        return <AjouterCategorie></AjouterCategorie>;
        break;
      default:
        return <AjouterCategorie></AjouterCategorie>;
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
            <button
              onClick={() => setAdminPage((adminPage = "ModerationUser"))}
            >
              Modération des utilisateurs
            </button>
            <button
              onClick={() => setAdminPage((adminPage = "AjouterCategorie"))}
            >
              Ajouter Catégorie
            </button>
          </div>
          <div className={style.createContainer}>{pageRenderAdmin()}</div>
          <div className={style.empty}></div>
        </div>
      </>
    );
  } else {
    return <>Loading...</>;
  }
}
