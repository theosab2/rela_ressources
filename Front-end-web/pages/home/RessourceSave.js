import Navigation from "../Navigation";
import style from "../../styles/Home.module.css";
import Image from "next/dist/client/image";
import Link from "next/link";

export default function () {
  const showModal = () => {
    document.getElementById("myModal").style.display = "block";
  };

  const closeModal = () => {
    document.getElementById("myModal").style.display = "none";
  };
  return (
    <>
      <div className={style.mainContainer}>
        <div className={style.filterContainer}>
          <div>
          <p> Trier par date</p><Image
            src={"/../public/Image/sort.png"}
            atl={"icon connexion"}
            width={25}
            height={25}
          />
          </div>
          <div>
          <p> Trier par nom</p><Image
            src={"/../public/Image/sort_letter.png"}
            atl={"icon connexion"}
            width={25}
            height={25}
          />
          </div>
          <div>
          <p> Trier par avis</p><Image
            src={"/../public/Image/fire.png"}
            atl={"icon connexion"}
            width={25}
            height={25}
          />
          </div>
        </div>
        <div className={style.articleContainer}>
          <div className={style.firstPartContainer}>
            <div className={style.firstInfo}>
              <div className={style.userInfoContainer}>
                <img src="/Image/connexion.png" className={style.userPicture}/>
                <div className={style.userPostInfoContainer}>
                  <div className={style.userName}>JeanMichelle</div>
                  <div className={style.publicationDate}>Publication : Il y a 4h</div>
                </div>
              </div>
              <div className={style.articleTitle}>Je suis un jolie titre</div>
            </div>
            <img src="/Image/Bateau_2.jpg" className={style.articlePicture}/>
          </div>
          <div className={style.articleBody}>Je suis une courte description de ce qui se trouve sur l’image dans le bas de la ressource et il y a une faute d’orthographe</div>
          <div className={style.articleFooter}>
            <div className={style.articleRate}>
              <div>235</div>
              <img src="/Image/like.png" />
              <div>156</div>
              <img src="/Image/like.png" className={style.dislike}/>
            </div>
            <div className={style.articleOption}>
              <img src="/Image/alert.png" />
              <img src="/Image/forward.png" />
              <img src="/Image/plus.png" />
              <img src="/Image/comments.png" />
            </div>
          </div>
        </div>
     </div>
    </>
  );
}
