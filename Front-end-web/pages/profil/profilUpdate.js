import style from "../../styles/profil.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import utils from "../utils";
import {useRef} from 'react';
import { isResSent } from "next/dist/next-server/lib/utils";
import cookieManager from "../utils/cookieManager";

export default function ProfilUpdate() {
  const mailUser = useRef(null);
  const nameUser = useRef(null);
  const lastname = useRef(null);
  const username = useRef(null);
  let [userInfo, setUserInfo] = useState(null);
  //let userInfo;
  let cookie;
  cookie = cookieManager();

  /*async function getUser(){
    console.log("http://"+process.env.IP+":3001/user/" + cookie._id);
    await fetch("http://"+process.env.IP+":3001/user/" + cookie._id, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data);
      });
    }*/

  async function updateUser() {
    let res = await fetch("http://"+process.env.IP+":3001/user/" + cookie._id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          firstname: nameUser.current.value,
          name: lastname.current.value,
          email: mailUser.current.value,
        },
      }),
    });
    res = await res.json();
  }

  useEffect(() => {
    if (window) { 
      window.sessionStorage.setItem("Page", "Profil" );
    }
  }, []);
  
    if (cookie != null) {
      console.log(cookie)
      return (
        <>
          <div className={style.profilContainer}>
            <p>Modifier vos informations</p>
            <div className={style.profilInformation}>
              <div>
                <label>Nom</label>
                <input type="text" ref={lastname} defaultValue={cookie.lastname} 
                ></input>
                <label>Identifiant</label>
                <input type="text" ref={username} defaultValue={cookie.username} ></input>
              </div>
              <div>
                <label>Prenom</label>
                <input type="text" ref={nameUser} defaultValue={cookie.firstname}></input>
                <label>Email</label>
                <input type="text" ref={mailUser} defaultValue={cookie.email}></input>
              </div>  
            </div>
          </div>
          <button className={style.profilUpdateButton} onClick={()=>updateUser()}>Valider</button>
          <div className={style.profilContainer}>
            <p>Modifier mot de passe</p>
            <div className={style.profilInformation}>
              <div>
                <label>Mot de passe</label>
                <input type="text" onChange={(title) => setTitle(title.target.value)}></input>
              </div>
              <div>
                <label>Nouveau mot de passe</label>
                <input type="text"></input>
                <label>Confirmer nouveau mot de passe</label>
                <input type="text"></input>
              </div>  
            </div>
          </div>
          <button className={style.profilUpdateButton}>Valider</button>
        </>
      );
    } else 
    return <div> Loading...</div>;
  }
