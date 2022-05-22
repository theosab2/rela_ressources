import style from "../../styles/profil.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import utils from "../utils";

export default function ProfilUpdate() {
  const userCookie = utils();
  const [mailUser, setMailUser] = useState("");
  const [nameUser, setNameUser] = useState("");
  const [surnameUser, setSurnameUser] = useState("");
  const [pseudoUser, setPseudoUser] = useState("");
  const [regionUser, setRegionUser] = useState("");
  const [townUser, setTownUser] = useState("");
  const [phoneUser, setPhoneUser] = useState("");
  let [userInfo, setUserInfo] = useState("");
  //let userInfo;
  let idUser;

  useEffect(() => {
    if (window) { 
      window.sessionStorage.setItem("Page", "Profil" );
    }
  }, []);

  async function updateUser() {
    let res = await fetch("http://localhost:3001/user/" + idUser, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: pseudoUser,
          firstname: surnameUser,
          name: nameUser,
          phone: phoneUser,
          email: mailUser,
          location: {
            ville: townUser,
            region: regionUser,
            zip: "zip",
          },
        },
      }),
    });
    res = await res.json();
  }

  if (userCookie != false) {
    const userInfo = JSON.parse(userCookie);
    idUser = userInfo._id;

    /*const getUser = async () =>
      await fetch("http://localhost:3001/user/" + idUser, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          userInfo(data);
          console.log(userInfo);
        });

    getUser();

    console.log(userInfo);*/

    if (userInfo != null) {
      console.log(userInfo);
      return (
        <>
          <div className={style.profilContainer}>
            <p>Modifier vos informations</p>
            <div className={style.profilInformation}>
              <div>
                <label>Nom</label>
                <input type="text" defaultValue={userInfo.name}></input>
                <label>Identifiant</label>
                <input type="text" defaultValue={userInfo.username}></input>
              </div>
              <div>
                <label>Prenom</label>
                <input type="text" defaultValue={userInfo.firstname}></input>
                <label>Email</label>
                <input type="text" defaultValue={userInfo.email}></input>
              </div>  
            </div>
          </div>
          <div className={style.profilContainer}>
            <p>Mes informations personelles</p>
            <div className={style.profilInformation}>
              <div>
                <label>Pays</label>
                <input type="text" defaultValue="France"></input>
                <label>Ville</label>
                <input type="text" defaultValue={userInfo.location.ville}></input>
                <label>Numéro de téléphone</label>
                <input type="text" defaultValue={userInfo.phone}></input>
              </div>
              <div>
                <label>Code postal</label>
                <input type="text" defaultValue={userInfo.location.zip}></input>
                <label>Rue</label>
                <input type="text" defaultValue={userInfo.location.zip}></input>
              </div>  
            </div>
          </div>
          <div className={style.profilContainer}>
            <p>Modifier mot de passe</p>
            <div className={style.profilInformation}>
              <div>
                <label>Mot de passe</label>
                <input type="text"></input>
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
    } else return <div> Loading...</div>;
  } else return <div> Loading...</div>;
}
