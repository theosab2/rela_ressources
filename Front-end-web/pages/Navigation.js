import Link from "next/link";
import Image from "next/image";
import style from "../styles/navigation.module.css";
import { setCookies, getCookie, removeCookies } from "cookies-next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import cookie from "cookie";
import Home from "./home/Home";
import createPost from "./crudPost/createPost";
import utils from "./utils";


export default function Navigation(image) {
  const router = useRouter();
  const navTitle = "Accueil";

  let [renderPage, setRenderPage] = useState("Accueil");

  useEffect(() => {
    if (router.asPath == "/") {
      router.push("/");
    }
  }, []);

  const deconnexionUtilisateur = () => {
    removeCookies("token");
    router.push("/home/Home");
  };

  const moderationUtilisateur = () => {
    router.push("/administration/AdministrationHome");
  };

  function pageRender() {
    switch (renderPage) {
      case "Accueil":
        return <Home></Home>;
        break;
      default:
        return <Home></Home>;
    }
  }

  const userCookie = utils();
  if (userCookie == false) {
    return (
      <>
        <div className={style.navHeader}>
          <img src="/Image/burger-menu.png" className={style.burger_menu}/>
          <p className={style.headerTitle}>Ressource Relationnelle</p>
          <p className={style.headerPageTitle}>{navTitle}</p>
          <img src="/Image/connexion.png" className={style.icon_connexion}/>
        </div>
        <div className={style.navBody}>
          <div className={style.sideBar}>
            <div className={style.sidebarContent}>
              <div className={style.sidebarTitle}>Profil</div>
              <div className={style.sidebarChoice}>
                <div>Connexion</div>
                <div>Inscription</div>
              </div>
            </div>
          </div>
          <div className={style.navContentSeparator}>
          {pageRender()}
            <div className={style.recentContent}>
              <div className={style.recentTitle}>Récent</div>
                <div className={style.recentChoice}>
                    <img 
                    src="/Image/connexion.png"
                    alt="User picture"
                    className={style.recentUserPicture}
                    />
                <div className={style.recentInfo}>
                      <div className={style.recentUserName}>JeanMichel62</div>
                      <div className={style.recentArticleTitle}>La terre est ovoidale</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}