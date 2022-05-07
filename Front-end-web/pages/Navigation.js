import Link from "next/link";
import Image from "next/image";
import style from "../styles/navigation.module.css";
import { setCookies, getCookie, removeCookies } from "cookies-next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import cookie from "cookie";
import Home from "./home/Home";
import Connexion from "./login/Connexion";
import Inscription from "./login/Inscription";
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
      case "Connexion":
        return <Connexion></Connexion>;
        break;
      case "Inscription":
        return <Inscription></Inscription>;
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
          <button onClick={() => setRenderPage((renderPage = "Accueil"))} className={style.headerTitle}>Ressource Relationnelle</button>
          <p className={style.headerPageTitle}>{navTitle}</p>
          <img src="/Image/connexion.png" className={style.icon_connexion}/>
        </div>
        <div className={style.navBody}>
          <div className={style.sideBar}>
            <div className={style.sidebarContent}>
              <div className={style.sidebarTitle}>Profil</div>
              <div className={style.sidebarChoice}>
                <button onClick={() => setRenderPage((renderPage = "Connexion"))}>Connexion</button>
                <button onClick={() => setRenderPage((renderPage = "Inscription"))}>Inscription</button>
              </div>
            </div>
          </div>
          <div className={style.navContentSeparator}>
            <div className={style.pageRender}>
            {pageRender()}
            </div>
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
  }else{
    <>
        <div className={style.navHeader}>
          <img src="/Image/burger-menu.png" className={style.burger_menu}/>
          <button onClick={() => setRenderPage((renderPage = "Accueil"))} className={style.headerTitle}>Ressource Relationnelle</button>
          <p className={style.headerPageTitle}>{navTitle}</p>
          <img src="/Image/connexion.png" className={style.icon_connexion}/>
        </div>
        <div className={style.navBody}>
          <div className={style.sideBar}>
            <div className={style.sidebarContent}>
              <div className={style.sidebarTitle}>Profil</div>
              <div className={style.sidebarChoice}>
                <button onClick={() => setRenderPage((renderPage = "Connexion"))}>Connexion</button>
                <button onClick={() => setRenderPage((renderPage = "Inscription"))}>Inscription</button>
              </div>
            </div>
            <div className={style.sidebarContent}>
              <div className={style.sidebarTitle}>Profil</div>
              <div className={style.sidebarChoice}>
                <button onClick={() => setRenderPage((renderPage = "Connexion"))}>Connexion</button>
                <button onClick={() => setRenderPage((renderPage = "Inscription"))}>Inscription</button>
              </div>
            </div>
          </div>
          <div className={style.navContentSeparator}>
            <div className={style.pageRender}>
            {pageRender()}
            </div>
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
  }
}