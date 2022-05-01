import Link from "next/link";
import Image from "next/image";
import style from "../styles/navigation.module.css";
import { setCookies, getCookie, removeCookies } from "cookies-next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
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
      <>
        <div className={style.header}>
        <img src="/Image/burger-menu.png" className={style.burger_menu}/>
        <p className={style.headerTitle}>Ressource Relationnelle</p>
        </div>
        <div className={style.sideBar}>
          <div className={style.sidebarcontent}>

          </div>
        </div>
      </>
    );
  }
}