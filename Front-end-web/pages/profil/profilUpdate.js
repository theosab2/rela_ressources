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
          <div className={style.contentleft}>
            <Image
              className={style.ImageProfil}
              src="/../public/Image/logo-gouvernement.jpeg" // Route of the image file
              height={200} // Desired size with correct aspect ratio
              width={200} // Desired size with correct aspect ratio
              alt="Logo gouvernement français"
            />
            <div className={style.inputTextContainer}>
              <label className={style.input_label} htmlFor="Nom">Nom</label>
              <input
                className={style.input}
                id="nameUser"
                type="text"
                defaultValue={userInfo.name}
                onFocus={(e) => {e.target.className = style.input_focused}}
                onBlur={(e) => {e.target.className = style.input}}
                onChange={(nameUser) => setNameUser(nameUser.target.value)}
              ></input>
            </div>
            <div className={style.inputTextContainer}>
              <label className={style.input_label} htmlFor="Prenom">Prenom</label>
              <input
                className={style.input}
                id="surnameUser"
                type="text"
                defaultValue={userInfo.firstname}
                onFocus={(e) => {e.target.className = style.input_focused}}
                onBlur={(e) => {e.target.className = style.input}}
                onChange={(surnameUser) =>
                  setSurnameUser(surnameUser.target.value)
                }
              ></input>
            </div>
            <div className={style.inputTextContainer}>
              <label className={style.input_label} htmlFor="Pseudonyme">Pseudonyme</label>
              <input
                className={style.input}
                type="text"
                defaultValue={userInfo.username}
                onFocus={(e) => {e.target.className = style.input_focused}}
                onBlur={(e) => {e.target.className = style.input}}
                onChange={(pseudoUser) =>
                  setPseudoUser(pseudoUser.target.value)
                }
              ></input>
            </div>
          </div>
          <div className={style.contentright}>
            <div className={style.inputTextContainer}>
              <label className={style.input_label} htmlFor="Mail">Adresse mail</label>
              <input
                className={style.largeInput}
                id="mailUser"
                type="text"
                defaultValue={userInfo.email}
                onFocus={(e) => {e.target.className = style.largeInput_focused}}
                onBlur={(e) => {e.target.className = style.largeInput}}
                onChange={(mailUser) => setMailUser(mailUser.target.value)}
              ></input>
            </div>
            <div className={style.inputTextContainer}>
              <label className={style.input_label} htmlFor="Pays">Region</label>
              <input
                className={style.input}
                type="text"
                defaultValue={userInfo.location.ville}
                onFocus={(e) => {e.target.className = style.input_focused}}
                onBlur={(e) => {e.target.className = style.input}}
                onChange={(regionUser) =>
                  setRegionUser(regionUser.target.value)
                }
              ></input>
            </div>
            <div className={style.inputTextContainer}>
              <label className={style.input_label} htmlFor="Ville">Ville</label>
              <input
                className={style.input}
                type="text"
                defaultValue={userInfo.location.region}
                onFocus={(e) => {e.target.className = style.input_focused}}
                onBlur={(e) => {e.target.className = style.input}}
                onChange={(townUser) => setTownUser(townUser.target.value)}
              ></input>
            </div>
            <div className={style.inputTextContainer}>
              <label className={style.input_label} htmlFor="naissance">Téléphone</label>
              <input
                className={style.input}
                type="text"
                defaultValue={userInfo.phone}
                onFocus={(e) => {e.target.className = style.input_focused}}
                onBlur={(e) => {e.target.className = style.input}}
                onChange={(phoneUser) => setPhoneUser(phoneUser.target.value)}
              ></input>
            </div>
            <div className={style.inputTextContainer}>
              <div className={style.ImageUpdate}>
                <Image
                  className={style.ImageUpdateImg}
                  src="/../public/Image/update.png" // Route of the image file
                  height={100} // Desired size with correct aspect ratio
                  width={100} // Desired size with correct aspect ratio
                  alt="Icone modification"
                  onClick={updateUser}
                />
              </div>
            </div>
          </div>
        </>
      );
    } else return <div> Loading...</div>;
  } else return <div> Loading...</div>;
}
