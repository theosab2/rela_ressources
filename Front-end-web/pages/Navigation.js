import Link from "next/link";
import Image from "next/image";
import style from "../styles/Navigation.module.css";
import { setCookies, getCookie, removeCookies } from "cookies-next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Modal from "antd/lib/modal/Modal";
import cookie from "cookie";
import Home from "./home/Home";
import createPost from "./crudPost/createPost";
import utils from "./utils";

export default function Navigation(image) {
  const router = useRouter();
  const navTitle = "Accueil";
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

  const userCookie = utils();
  if (userCookie == false) {
    return (
      <div className={style.navBarContent}>
        <Link href="/home/Home">
          <a>
            <div className={style.navTitle}>
              <Image
                src="/../public/Image/logo-gouvernement.jpeg" // Route of the image file
                height={80} // Desired size with correct aspect ratio
                width={80} // Desired size with correct aspect ratio
                alt="Logo gouvernement français"
              />
              <p className={style.textTitre}>Ressources Relationnelles</p>
            </div>
          </a>
        </Link>
        <div className={style.dropdown}>
          <button className={style.dropbtn}>
            <Image
              src="/../public/Image/burger-menu.png" // Route of the image file
              height={50} // Desired size with correct aspect ratio
              width={50} // Desired size with correct aspect ratio
              alt="Menu"
            />
          </button>
          <div className={style.dropdown_content}>
            <Link href="/home/Home">
              <a> Fil d'actualité</a>
            </Link>
            <Link href="/home/Home">
              <a> Ressources enregistrer</a>
            </Link>
          </div>
        </div>
        <p style={{ fontSize: "20px" }}>{navTitle}</p>
        <div className={style.dropdown}>
          <Image
            src={"/../public/Image/connexion.png"} // Route of the image file
            height={60} // Desired size with correct aspect ratio
            width={60} // Desired size with correct aspect ratio
            alt="Image profil"
            className={style.imageProfil}
          />
          <div className={style.dropdown_content}>
            <Link href="/login/Connexion">
              <a>
                <div className={style.navTitle}>
                  <p className={style.deconnexion}>Connexion</p>
                </div>
              </a>
            </Link>
          </div>
        </div>
      </div>
    );
  } else
    return (
      <div className={style.navBarContent}>
        <Link href="/home/Home">
          <a>
            <div className={style.navTitle}>
              <Image
                src="/../public/Image/logo-gouvernement.jpeg" // Route of the image file
                height={80} // Desired size with correct aspect ratio
                width={80} // Desired size with correct aspect ratio
                alt="Logo gouvernement français"
              />
              <p className={style.textTitre}>Ressources Relationnelles</p>
            </div>
          </a>
        </Link>
        <div className={style.dropdown}>
          <button className={style.dropbtn}>
            <Image
              src="/../public/Image/burger-menu.png" // Route of the image file
              height={50} // Desired size with correct aspect ratio
              width={50} // Desired size with correct aspect ratio
              alt="Menu"
            />
          </button>
          <div className={style.dropdown_content}>
            <Link href="/home/Home">
              <a> Fil d'actualité</a>
            </Link>
            <Link href="/home/Home">
              <a> Ressources enregistrer</a>
            </Link>

            <Link href="../profil/profilHome">
              <a> Profil</a>
            </Link>
            <Link href="../crudPost/createPost">
              <a> Créer un post</a>
            </Link>
          </div>
        </div>
        <div>
          <button className={style.searchIcon}></button>
          <input
            type="text"
            placeholder="Rechercher"
            className={style.searchBar}
          ></input>
        </div>
        <p style={{ fontSize: "20px" }}>{navTitle}</p>
        <div className={style.dropdown}>
          <Image
            src={
              userCookie
                ? "/../public/Image/Bateau_2.jpg"
                : "/../public/Image/connexion.png"
            } // Route of the image file
            height={60} // Desired size with correct aspect ratio
            width={60} // Desired size with correct aspect ratio
            alt="Image profil"
            className={style.imageProfil}
          />
          <div className={style.dropdown_content}>
            {userCookie ? (
              <div className={style.navTitleProfil}>
                <p
                  onClick={deconnexionUtilisateur}
                  className={style.deconnexion}
                >
                  Déconnexion
                </p>
                <p
                  onClick={moderationUtilisateur}
                  className={style.deconnexion}
                >
                  Moderation
                </p>
              </div>
            ) : (
              <Link href="/login/Connexion">
                <a>
                  <div className={style.navTitle}>
                    <p className={style.deconnexion}>Connexion</p>
                  </div>
                </a>
              </Link>
            )}
            <p>{userCookie ? userCookie.username : ""}</p>
          </div>
        </div>
      </div>
    );
}
