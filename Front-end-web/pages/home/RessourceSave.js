import Navigation from "../Navigation";
import style from "../../styles/Home.module.css";
import Image from "next/dist/client/image";
import Link from "next/link";
import { useEffect } from "react";
import articleManager from "../utils/articleManager";
import ComponentArticle from "./ComponentArticle";
import cookieManager from "../utils/cookieManager";

export default function RessourceSave() {
  let allArticle;
  let array = [];
  const userCookie = cookieManager();
  const userInfo = JSON.parse(userCookie);
  console.log(userInfo)
  useEffect(() => {
    if (window) { 
      window.sessionStorage.setItem("Page", "Favorie" );
    }
  }, []);

  const showModal = () => {
    document.getElementById("myModal").style.display = "block";
  };

  const closeModal = () => {
    document.getElementById("myModal").style.display = "none";
  };

  allArticle = articleManager();

  if(allArticle != null){

    allArticle.forEach(element => {
      console.log(element._id)
      console.log(userInfo.favorites)
      if(userInfo.favorites.includes(element._id)){
      array.push(element)
      }
    });

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
        {array && array.reverse().map((array) => (
            <ComponentArticle articleInfo={array} key={array._id}/>
        ))}
     </div>
    </>
  );
  }else{
    return <>loading...</>
  }
}
