import Link from "next/link";
import Image from "next/image";
import style from "../styles/Navigation.module.css";

export default function Navigation() {
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
            Ressources Relationnelles
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
            <a> Créer un post</a>
          </Link>
          <Link href="/home/Home">
            <a> Ressources enregistrer</a>
          </Link>
          <Link href="/home/Home">
            <a> Parametre</a>
          </Link>
        </div>
      </div>
      <Link href="/login/Inscription">
        <a>
          <Image
            src="/../public/Image/logo-gouvernement.jpeg" // Route of the image file
            height={40} // Desired size with correct aspect ratio
            width={40} // Desired size with correct aspect ratio
            alt="Image profil"
          />
        </a>
      </Link>
    </div>
  );
}
