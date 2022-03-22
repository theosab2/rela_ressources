import { setCookies, getCookie, removeCookies } from "cookies-next";
import { useEffect, useState } from "react";
import Moderation from "./administration/Moderation";
export default function utils() {
  const [userCookie, setUserCookie] = useState(getCookie("token"));
  const [isLoading, setLoading] = useState(true);
  let [pageAdmin, setPagAdmin] = useState("");

  useEffect(() => {
    if (userCookie) {
      setLoading(true);
      setUserCookie(userCookie);
      setLoading(false);
    }
  }, [userCookie]);

  if (isLoading) {
    return false;
  } else {
    return userCookie;
  }

  function menuBurgerNav() {
    return (
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

          <Link href="/home/RessourceSave">
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
    );
  }
}
