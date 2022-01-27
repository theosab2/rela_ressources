import Link from "next/link";
import Image from "next/image";
import style from "../styles/Navigation.module.css";
import { setCookies, getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Modal from "antd/lib/modal/Modal";

export default function Navigation() {
  const [userCookie, setUserCookie] = useState(getCookie("token"));
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (userCookie != undefined) {
      setUserCookie(JSON.parse(userCookie));
      console.log(userCookie);
    }
    if (router.asPath == "/") {
      router.push("home/Home");
    }
  }, []);

  console.log(router.asPath);

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
            alt="Logo gouvernement français"
          />
        </button>
        <div className={style.dropdown_content}>
          <Link href="/home/Home">
            <a> Fil d'actualité</a>
          </Link>
          <Link href="/home/Home">
            <a> Ressources enregistrer</a>
          </Link>
          <Link href="/home/Home">
            <a> Parametre</a>
          </Link>
        </div>
      </div>
      <p style={{ fontSize: "20px" }}>Je suis le titre de la navigation</p>

      <Link href="/login/Inscription">
        <a>
          <div className={style.navTitle}>
            <Image
              src="/../public/Image/logo-gouvernement.jpeg" // Route of the image file
              height={40} // Desired size with correct aspect ratio
              width={40} // Desired size with correct aspect ratio
              alt="Image profil"
            />
            <p>{userCookie ? userCookie.username : "non connecté"}</p>
          </div>
        </a>
      </Link>
    </div>
  );
}
