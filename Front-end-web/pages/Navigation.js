import Link from "next/link";
import Image from "next/image";
import style from "../styles/navigation.module.css";
import modalStyle from "../styles/modal.module.css";
import { setCookies, getCookie, removeCookies } from "cookies-next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import cookie from "cookie";
import Home from "./home/Home";
import Connexion from "./login/Connexion";
import Inscription from "./login/Inscription";
import CreatePost from "./crudPost/createPost";
import Comment from "./crudPost/Comment";
import Historique from "./home/MesRessource";
import Favorie from "./home/RessourceSave";
import Abonnement from "./home/Abonnement";
import Profil from "./Profil/profilUpdate";
import Amis from "./home/Amis";
import Groupe from "./home/Groupe";
import Evenement from "./home/Evenement";
import Moderation from "./administration/Moderation";
import Categorie from "./administration/AjouterCategorie";
import Utilisateur from "./administration/AdminRole";
import utils from "./utils";
import articleManager from "./utils/articleManager";

export default function Navigation(image) {
  const router = useRouter();
  const navTitle = "Accueil";
  var getSession = null;
  var getId = null;
  let [renderPage, setRenderPage] = useState("");
  let [idPage, setIdPage] = useState("");

  let allArticle;
  allArticle = articleManager();

  const showModal = () => {
    document.getElementById("myModal").style.display = "block";
  };

  const closeModal = () => {
    document.getElementById("myModal").style.display = "none";
  };

  useEffect(() => {
    if (window) { 
      getSession = window.sessionStorage.getItem("Page");
      if(getSession == null){
        window.sessionStorage.setItem("Page", "Accueil" );
      }
      getSession = window.sessionStorage.getItem("Page");
      getId = window.sessionStorage.getItem("id");
      setRenderPage(getSession);
      setIdPage(getId);
    }
  }, []);


  const deconnexionUtilisateur = () => {
    removeCookies("token");
    setRenderPage((renderPage = "Accueil"));
    router.reload(window.location.pathname)
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
      case "Creer":
        return <CreatePost></CreatePost>;
        break;
      case "Historique":
        return <Historique></Historique>;
        break;
      case "Favorie":
        return <Favorie></Favorie>;
        break;
      case "Abonnement":
        return <Abonnement></Abonnement>;
        break;      
      case "Profil":
        return <Profil></Profil>;
        break;
      case "Amis":
        return <Amis></Amis>;
        break;
      case "Groupe":
        return <Groupe></Groupe>;
        break;
      case "Evenement":
        return <Evenement></Evenement>;
        break;
      case "Moderation":
        return <Moderation></Moderation>;
        break;
      case "Categorie":
        return <Categorie></Categorie>;
        break;
      case "Utilisateur":
        return <Utilisateur></Utilisateur>;
        break;
      case "Comment":
        return <Comment articleId={idPage}></Comment>;
        break;
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
                <button className={style.sidebarOpenPage}  onClick={() => setRenderPage((renderPage = "Connexion"))}>Connexion</button>
                <button className={renderPage == 'Inscription'? style.sidebarOpenPage : null} onClick={() => setRenderPage((renderPage = "Inscription"))}>Inscription</button>
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
    return(
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
              <div className={style.sidebarTitle}>Publication</div>
              <div className={style.sidebarChoice}>
                <button onClick={() => setRenderPage((renderPage = "Accueil"))}>Accueil</button>
                <button className={renderPage == 'Creer'?style.sidebarOpenPage:null} onClick={() => setRenderPage((renderPage = "Creer"))}>Créer une ressource</button>
                <button onClick={() => setRenderPage((renderPage = "Historique"))}>Historique de mes ressources</button>
                <button onClick={() => setRenderPage((renderPage = "Favorie"))}>Mes ressources favorites</button>
                <button onClick={() => setRenderPage((renderPage = "Abonnement"))}>Mes abonnements</button>
              </div>
            </div>
            <div className={style.sidebarContent}>
              <div className={style.sidebarTitle}>Profil</div>
              <div className={style.sidebarChoice}>
                <button onClick={() => setRenderPage((renderPage = "Profil"))}>Modifier le profil</button>
                <button onClick={() => showModal()}>Deconnexion</button>
              </div>
            </div>
            <div className={style.sidebarContent}>
              <div className={style.sidebarTitle}>Communauté</div>
              <div className={style.sidebarChoice}>
                <button onClick={() => setRenderPage((renderPage = "Amis"))}>Amis</button>
                <button onClick={() => setRenderPage((renderPage = "Groupe"))}>Groupes</button>
                <button onClick={() => setRenderPage((renderPage = "Evenement"))}>Evenements</button>
              </div>
            </div>
            <div className={style.sidebarContent}>
              <div className={style.sidebarTitle}>Paramètre</div>
              <div className={style.sidebarChoice}>
                <button onClick={() => setRenderPage((renderPage = "Preference"))}>Préférences</button>
                <button onClick={() => setRenderPage((renderPage = "Supprimer"))}>Supprimer mon compte</button>
                <button onClick={() => setRenderPage((renderPage = "Condition"))}>Conditions d'utilisation</button>
              </div>
            </div>
            <div className={style.sidebarContent}>
              <div className={style.sidebarTitle}>Administration</div>
              <div className={style.sidebarChoice}>
                <button onClick={() => setRenderPage((renderPage = "Accueil"))}>Accueil</button>
                <button onClick={() => setRenderPage((renderPage = "Moderation"))}>Modération</button>
                <button onClick={() => setRenderPage((renderPage = "Categorie"))}>Administration de catégorie</button>
                <button onClick={() => setRenderPage((renderPage = "Utilisateur"))}>Modifier les utilisateurs</button>
                <button onClick={() => setRenderPage((renderPage = "Statiques"))}>Statistiques</button>
              </div>
            </div>
          </div>
          <div className={style.navContentSeparator}>
            <div className={style.pageRender}>
          <div id="myModal" className={modalStyle.modalContainer}>
            <div className={modalStyle.modalHeader}>
            <div>Deconnexion</div>
              <button onClick={closeModal}>
                x
              </button>
              
            </div>
            <div className={modalStyle.modalBody}>
            <button value="Annuler">Annuler</button>
            <button value="Valider" onClick={() => {deconnexionUtilisateur()}}>Valider</button>
            </div>
          </div>
            {pageRender()}
            </div>

            <div className={style.recentContent}>
              <div className={style.recentTitle}>Récent</div>
              {allArticle && allArticle.reverse(0,5).map((articleInfo) => (
                <div className={style.recentChoice} key={articleInfo._id}>
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
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
}