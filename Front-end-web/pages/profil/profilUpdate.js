import style from "../../styles/profil.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import utils from "../utils";

export default function ProfilUpdate() {
  const userCookie = utils();
  if (userCookie != false) {
    const userInfo = JSON.parse(userCookie);
    return (
      <>
        <div className={style.contentleft}>
          <Image
            className={style.ImageProfil}
            src="/../public/Image/logo-gouvernement.jpeg" // Route of the image file
            height={200} // Desired size with correct aspect ratio
            width={200} // Desired size with correct aspect ratio
            alt="Logo gouvernement français"
          />
          <div className={style.inputTextContainer}>
            <label htmlFor="Nom">Nom</label>
            <input type="text" value={userInfo.name}></input>
          </div>
          <div className={style.inputTextContainer}>
            <label htmlFor="Prenom">Prenom</label>
            <input type="text" value={userInfo.firstname}></input>
          </div>
          <div className={style.inputTextContainer}>
            <label htmlFor="Pseudonyme">Pseudonyme</label>
            <input type="text" value={userInfo.username}></input>
          </div>
        </div>
        <div className={style.contentright}>
          <div className={style.inputTextContainer}>
            <label htmlFor="Mail">Adresse mail</label>
            <input type="text" value={userInfo.username}></input>
          </div>
          <div className={style.inputTextContainer}>
            <label htmlFor="Pays">Region</label>
            <input type="text" value={userInfo.location.ville}></input>
          </div>
          <div className={style.inputTextContainer}>
            <label htmlFor="Pays">Ville</label>
            <input type="text" value={userInfo.location.region}></input>
          </div>
          <div className={style.inputTextContainer}>
            <label htmlFor="naissance">Téléphone</label>
            <input type="text" value={userInfo.phone}></input>
          </div>
          <div className={style.inputTextContainer}>
            <div className={style.ImageUpdate}>
              <Image
                className={style.ImageUpdateImg}
                src="/../public/Image/update.png" // Route of the image file
                height={100} // Desired size with correct aspect ratio
                width={100} // Desired size with correct aspect ratio
                alt="Icone modification"
              />
            </div>
          </div>
        </div>
      </>
    );
  } else return <div> Loading...</div>;
}
