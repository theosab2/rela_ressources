import { setCookies, getCookie, removeCookies } from "cookies-next";
import Navigation from "../Navigation";
import style from "../../styles/profil.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import { GetServerSideProps } from "next";
import ProfilUpdate from "./profilUpdate";
import ProfilParam from "./profilParam";
import ProfilHistorique from "./profilHistorique";
import { useRouter } from "next/router";

export default function profilHome() {
  const [userCookie, setUserCookie] = useState(getCookie("token"));
  let [profilPage, setProfilPage] = useState("");
  useEffect(() => {
    if (userCookie != undefined) {
      setUserCookie(userCookie);
    }
  }, [userCookie]);
  function pageRenderProfil() {
    switch (profilPage) {
      case "ProfilUpdate":
        return <ProfilUpdate></ProfilUpdate>;
        break;
      case "ProfilParam":
        return <ProfilParam></ProfilParam>;
        break;
      case "ProfilHistorique":
        return <ProfilHistorique></ProfilHistorique>;
        break;
      default:
        return <ProfilUpdate></ProfilUpdate>;
    }
  }

  const deconnexionUtilisateur = () => {
    removeCookies("token");
    router.push("home/Home");
  };
  return (
    <>
      <Navigation></Navigation>
      <div className={style.containerProfil}>
        <div className={style.menu}>
          <button onClick={() => setProfilPage((profilPage = "ProfilUpdate"))}>
            Modifier profil
          </button>
          <button onClick={() => setProfilPage((profilPage = "ProfilParam"))}>
            Paramètres
          </button>
          <button
            onClick={() => setProfilPage((profilPage = "ProfilHistorique"))}
          >
            Historique de mes publication
          </button>
          <button onClick={() => null}>Supprimer mon compte</button>
          <button onClick={deconnexionUtilisateur}>Déconnexion</button>
        </div>
        <div className={style.content}>{pageRenderProfil()}</div>
        <div className={style.empty}></div>
      </div>
    </>
  );
}
