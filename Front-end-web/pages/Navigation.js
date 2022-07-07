import Link from "next/link";
import Image from "next/image";
import style from "../styles/navigation.module.css";
import modalStyle from "../styles/modal.module.css";
import { setCookies, getCookie, removeCookies } from "cookies-next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Home from "./home/Home";
import Connexion from "./login/Connexion";
import Inscription from "./login/Inscription";
import CreatePost from "./crudPost/createPost";
import Comment from "./crudPost/Comment";
import Historique from "./home/MesRessource";
import Favorie from "./home/RessourceSave";
import Abonnement from "./home/Abonnement";
import Profil from "./profil/profilUpdate";
import Amis from "./home/Amis";
import Groupe from "./home/Groupe";
import Evenement from "./home/Evenement";
import Moderation from "./administration/Moderation";
import Categorie from "./administration/AjouterCategorie";
import Utilisateur from "./administration/AdminRole";
import utils from "./utils";
import articleManager from "./utils/articleManager";
import Message from "./home/Message";
import EntrerGroupe from "./home/EntrerGroupe";
import cookieManager from "./utils/cookieManager";

export default function Navigation(image) {
  const router = useRouter();
  const [id, setId] = useState(null);
  const [hideBar, setBarHide] = useState(true);
  const [modal, setModal] = useState(false);
  const [modalDeleteUser, setModalDeleteUser] = useState(false);
  let [navTitle, setNavTitle] = useState("Accueil");
  var getSession = null;
  var getId = null;
  let [renderPage, setRenderPage] = useState("");
  let [idPage, setIdPage] = useState("");
  let cookie;
  let allArticle;

  useEffect(function showPost(){
    if(id != null){
      if (window) { 
        window.sessionStorage.setItem("Page", "Comment" );
        window.sessionStorage.setItem("id", id._id );
        router.reload(window.location.pathname)
      }
    }
  },[id]);

  allArticle = articleManager();
  //let isConnected = JSON.parse(utils());
  let isConnected = cookieManager();
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

  const deleteUtilisateur = async () => {
    await fetch("http://"+process.env.IP+"/user/delete/" + isConnected._id, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
    });
    }

  const moderationUtilisateur = () => {
    router.push("/administration/AdministrationHome");
  };

  function pageRender() {
    switch (renderPage) {
      case "Accueil":
        //setNavTitle("Accueil");
        return <Home></Home>;
        break;
      case "Connexion":
        //setNavTitle("Connexion");
        return <Connexion></Connexion>;
        break;
      case "Inscription":
        //setNavTitle("Inscription");
        return <Inscription></Inscription>;
        break;
      case "Creer":
        //setNavTitle("Creation de post");
        return <CreatePost></CreatePost>;
        break;
      case "Historique":
        //setNavTitle("Historique");
        return <Historique></Historique>;
        break;
      case "Favorie":
        //setNavTitle("Favorie");
        return <Favorie></Favorie>;
        break;
      case "Abonnement":
        //setNavTitle("Abonnement");
        return <Abonnement></Abonnement>;
        break;      
      case "Profil":
        //setNavTitle("Profil");
        return <Profil></Profil>;
        break;
      case "Amis":
        //setNavTitle("Amis");
        return <Amis></Amis>;
        break;
      case "Groupe":
        //setNavTitle("Groupe");
        return <Groupe></Groupe>;
        break;
      case "Moderation":
        //setNavTitle("Modération");
        return <Moderation></Moderation>;
        break;
      case "Categorie":
        //setNavTitle("Categorie");
        return <Categorie></Categorie>;
        break;
      case "Utilisateur":
        //setNavTitle("Utilisateur");
        return <Utilisateur></Utilisateur>;
        break;
      case "Comment":
        //setNavTitle("Commentaire");
        return <Comment articleId={idPage}></Comment>;
        break;
      case "Message":
        //setNavTitle("Commentaire");
        return <Message UserId={idPage}></Message>;
        break;
      case "EnterGroup":
          //setNavTitle("Commentaire");
          return <EntrerGroupe GroupId={idPage}></EntrerGroupe>;
          break;
    }
  }

  if (isConnected == null || isConnected == false) {
    return (
      <>
        <div className={style.navHeader}>
          <img src="/Image/home.png" className={style.burger_menu} onClick={() => setRenderPage((renderPage = "Accueil"))}/>
          <div className={style.headerTitle}>Ressource Relationnelle</div>
          <div className={style.headerPageTitle}>{navTitle}</div>
          <img src="/Image/connexion.png" className={style.icon_connexion}/>
        </div>
      {hideBar ?
        <div className={style.navBody}>
          <div className={style.sideBar}>
            <div className={style.sidebarContent}>
              <div className={style.sidebarTitle}>Profil</div>
              <div className={style.sidebarChoice}>
                <div className={style.inputDiv} onClick={() => setRenderPage((renderPage = "Connexion"))}>
                  <img src="/Image/key.png" className={style.InputImg}/>
                  <button className={style.sidebarOpenPage}>Connexion</button>
                </div>
                <div className={style.inputDiv} onClick={() => setRenderPage((renderPage = "Inscription"))}>
                  <img src="/Image/inscription.png" className={style.InputImg}/>
                  <button className={renderPage == 'Inscription'? style.sidebarOpenPage : null}>Inscription</button>
                </div>
              </div>
            </div>
          </div>
          <div className={style.navContentSeparator}>
            <div className={style.pageRender}>
            {pageRender()}
            </div>
            <div className={style.recentContent}>
              <div className={style.recentTitle}>Récent</div>
              {allArticle && allArticle.slice(0,6).map((articleInfo) => (
                <div className={style.recentChoice} key={articleInfo._id}>
                    <img 
                    src="/Image/connexion.png"
                    alt="User picture"
                    className={style.recentUserPicture}
                    />
                <div className={style.recentInfo}>
                      <div className={style.recentUserName}>JeanMichel62</div>
                      <div className={style.recentArticleTitle}>{articleInfo.title}</div>
                </div>
              </div>
              ))}
            </div>
          </div>
        </div>
        :<></>
      }
      </>
    );
  }else{
    return(
    <>
        <div className={style.navHeader}>
        <img src="/Image/home.png" className={style.burger_menu} onClick={() => setRenderPage((renderPage = "Accueil"))}/>
          <p className={style.username}>{isConnected.username}</p>
          <p  className={style.headerTitle}>Ressource Relationnelle</p>
          <img src="/Image/connexion.png" className={style.icon_connexion}/>
        </div>
      
        <div className={style.navBody}>
          <div className={style.sideBar}>
            <div className={style.sidebarContent}>
              <div className={style.sidebarTitle}>Publication</div>
              <div className={style.sidebarChoice}>
                <div className={renderPage == 'Accueil'?style.inputDivSelect:style.inputDiv} onClick={() => setRenderPage((renderPage = "Accueil"))}>
                  <img src="/Image/home.png" className={style.InputImg}/>
                  <button>Accueil</button>
                </div>
                <div className={renderPage == 'Creer'?style.inputDivSelect:style.inputDiv} onClick={() => setRenderPage((renderPage = "Creer"))}>
                  <img src="/Image/creer.png" className={style.InputImg}/>
                  <button>Créer une ressource</button>
                </div>
                <div className={renderPage == 'Historique'?style.inputDivSelect:style.inputDiv} onClick={() => setRenderPage((renderPage = "Historique"))}>
                  <img src="/Image/archiver.png" className={style.InputImg}/>
                  <button>Historique</button>
                </div>
                <div className={renderPage == 'Favorie'?style.inputDivSelect:style.inputDiv} onClick={() => setRenderPage((renderPage = "Favorie"))}>
                  <img src="/Image/favoris.png" className={style.InputImg}/>
                  <button>Favories</button>
                </div>
                <div className={renderPage == 'Abonnement'?style.inputDivSelect:style.inputDiv} onClick={() => setRenderPage((renderPage = "Abonnement"))}>
                  <img src="/Image/verify.png" className={style.InputImg}/>
                  <button>Mes abonnements</button>
                </div>
              </div>
            </div>
            <div className={style.sidebarContent}>
              <div className={style.sidebarTitle}>Profil</div>
              <div className={style.sidebarChoice}>
              <div className={renderPage == 'Profil'?style.inputDivSelect:style.inputDiv} onClick={() => setRenderPage((renderPage = "Profil"))}>
                  <img src="/Image/profil.png" className={style.InputImg}/>
                  <button>Modifier le profil</button>
                </div>                
                <div className={style.inputDiv} onClick={() => setModal(true)}>
                  <img src="/Image/se-deconnecter.png" className={style.InputImg}/>
                  <button>Deconnexion</button>
                </div>
              </div>
            </div>
            <div className={style.sidebarContent}>
              <div className={style.sidebarTitle}>Communauté</div>
              <div className={style.sidebarChoice}>
              <div className={renderPage == 'Amis'?style.inputDivSelect:style.inputDiv} onClick={() => setRenderPage((renderPage = "Amis"))}>
                  <img src="/Image/ajouter-un-ami.png" className={style.InputImg}/>
                  <button>Amis</button>
                </div>
                <div className={renderPage == 'Groupe'?style.inputDivSelect:style.inputDiv} onClick={() => setRenderPage((renderPage = "Groupe"))}>
                  <img src="/Image/groupe.png" className={style.InputImg}/>
                  <button>Groupes</button>
                </div>
              </div>
            </div>
            <div className={style.sidebarContent}>
              <div className={style.sidebarTitle}>Paramètre</div>
              <div className={style.sidebarChoice}>
              <div className={renderPage == 'Preference'?style.inputDivSelect:style.inputDiv} onClick={() => setRenderPage((renderPage = "Preference"))}>
                  <img src="/Image/options.png" className={style.InputImg}/>
                  <button>Préférences</button>
                </div>
                <div className={renderPage == 'Supprimer'?style.inputDivSelect:style.inputDiv} onClick={() => setModalDeleteUser(true)}>
                  <img src="/Image/delete-account.png" className={style.InputImg}/>
                  <button>Supprimer compte</button>
                </div>
                <div className={renderPage == 'Condition'?style.inputDivSelect:style.inputDiv} onClick={() => setRenderPage((renderPage = "Condition"))}>
                  <img src="/Image/conditions.png" className={style.InputImg}/>
                  <button>Conditions d'utilisation</button>
                </div>
              </div>
            </div>
            { isConnected.role == "Moderateur" || 
            isConnected.role == "Admin" ?  
            isConnected.role == "Admin" ? 
            <div className={style.sidebarContent}>
              <div className={style.sidebarTitle}>Administration</div>
                <div className={style.sidebarChoice}>
                <div className={renderPage == 'Moderation'?style.inputDivSelect:style.inputDiv} onClick={() => setRenderPage((renderPage = "Moderation"))}>
                  <img src="/Image/moderator.png" className={style.InputImg}/>
                  <button >Modération</button>
                </div>
                <div className={renderPage == 'Categorie'?style.inputDivSelect:style.inputDiv} onClick={() => setRenderPage((renderPage = "Categorie"))}>
                  <img src="/Image/evenement.png" className={style.InputImg}/>
                  <button >Catégorie</button>
                </div>
                <div className={renderPage == 'Utilisateur'?style.inputDivSelect:style.inputDiv} onClick={() => setRenderPage((renderPage = "Utilisateur"))}>
                  <img src="/Image/utilisateur.png" className={style.InputImg}/>
                  <button >Gérer utilisateurs</button>
                </div>
                <div className={renderPage == 'Statiques'?style.inputDivSelect:style.inputDiv} onClick={() => setRenderPage((renderPage = "Statiques"))}>
                  <img src="/Image/statistiques.png" className={style.InputImg}/>
                  <button>Statistiques</button>
                </div>
              </div>
            </div>
            :
            <div className={style.sidebarContent}>
              <div className={style.sidebarTitle}>Administration</div>
                <div className={style.sidebarChoice}>
                <div className={renderPage == 'Moderation'?style.inputDivSelect:style.inputDiv} onClick={() => setRenderPage((renderPage = "Moderation"))}>
                  <img src="/Image/moderator.png" className={style.InputImg}/>
                  <button >Modération</button>
                </div>
                <div className={renderPage == 'Categorie'?style.inputDivSelect:style.inputDiv} onClick={() => setRenderPage((renderPage = "Categorie"))}>
                  <img src="/Image/evenement.png" className={style.InputImg}/>
                  <button >Catégorie</button>
                </div>
              </div>
            </div>
            :
            <></>
            }
          </div>
        <div className={style.navContentSeparator}>
        <div className={style.pageRender}>
        {modal ?
          <div className={modalStyle.modalContainer}>
            <div className={modalStyle.modalHeader}>
                <div>Deconnexion</div>
                  <button onClick={() =>setModal(false)}>
                    x
                  </button>
                </div>
              <div className={modalStyle.modalBody}>
                <button value="Annuler" onClick={() =>setModal(false)}>Annuler</button>
                <button value="Valider" onClick={() => {deconnexionUtilisateur()}}>Valider</button>
              </div>
            </div>
            :
            <></>
        }
        {modalDeleteUser ?
          <div className={modalStyle.modalContainer}>
            <div className={modalStyle.modalHeader}>
                <div>Supprimer votre compte ?</div>
                  <button onClick={() =>setModalDeleteUser(false)}>
                    x
                  </button>
                </div>
              <div className={modalStyle.modalBody}>
                <button value="Annuler" onClick={() =>setModalDeleteUser(false)}>Annuler</button>
                <button value="Valider" onClick={() =>deleteUtilisateur()}>Valider</button>
              </div>
            </div>
            :
            <></>
        }
          {pageRender()}
        </div>
            <div className={style.recentContent}>
              <div className={style.recentTitle}>Récents</div>
              {allArticle && allArticle.slice(0,6).map((articleInfo) => (
                <div className={style.recentChoice} key={articleInfo._id} onClick={() => setId(articleInfo._id)}>
                    <img 
                    src={articleInfo.image}
                    alt="Image article"
                    className={style.recentUserPicture}
                    />
                <div className={style.recentInfo}>
                      <div className={style.recentArticleTitle}>{articleInfo.title}</div>
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