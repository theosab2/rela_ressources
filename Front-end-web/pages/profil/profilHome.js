import { setCookies, getCookie, removeCookies } from "cookies-next";
import Navigation from "../Navigation";
import style from "../../styles/profil.module.css";
import Image from "next/image";

export default function profilHome() {
  return (
    <>
      <Navigation></Navigation>
      <div className={style.containerProfil}>
        <div className={style.menu}>
          <p>Modifier profil</p>
          <p>Historique de mes publication</p>
          <p>Supprimer mon compte</p>
          <p>Déconnexion</p>
        </div>
        <div className={style.content}>
          <div className={style.contentleft}>
            <Image
              src="/../public/Image/logo-gouvernement.jpeg" // Route of the image file
              height={80} // Desired size with correct aspect ratio
              width={80} // Desired size with correct aspect ratio
              alt="Logo gouvernement français"
            />
            <div>Nom</div>
            <div>Prenom</div>
            <div>Pseudonyme</div>
          </div>
          <div className={style.contentright}>
            <div>Adresse mail</div>
            <div>Pays</div>
            <div>Date de naissance</div>
          </div>
        </div>
        <div className={style.empty}></div>
      </div>
    </>
  );
}
