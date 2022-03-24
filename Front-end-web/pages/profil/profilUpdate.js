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
    console.log(idUser);
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
            <label htmlFor="Nom">Nom</label>
            <input
              type="text"
              defaultValue={userInfo.name}
              onChange={(nameUser) => setNameUser(nameUser.target.value)}
            ></input>
          </div>
          <div className={style.inputTextContainer}>
            <label htmlFor="Prenom">Prenom</label>
            <input
              type="text"
              defaultValue={userInfo.firstname}
              onChange={(surnameUser) =>
                setSurnameUser(surnameUser.target.value)
              }
            ></input>
          </div>
          <div className={style.inputTextContainer}>
            <label htmlFor="Pseudonyme">Pseudonyme</label>
            <input
              type="text"
              defaultValue={userInfo.username}
              onChange={(pseudoUser) => setPseudoUser(pseudoUser.target.value)}
            ></input>
          </div>
        </div>
        <div className={style.contentright}>
          <div className={style.inputTextContainer}>
            <label htmlFor="Mail">Adresse mail</label>
            <input
              type="text"
              defaultValue={userInfo.username}
              onChange={(mailUser) => setMailUser(mailUser.target.value)}
            ></input>
          </div>
          <div className={style.inputTextContainer}>
            <label htmlFor="Pays">Region</label>
            <input
              type="text"
              defaultValue={userInfo.location.ville}
              onChange={(regionUser) => setRegionUser(regionUser.target.value)}
            ></input>
          </div>
          <div className={style.inputTextContainer}>
            <label htmlFor="Ville">Ville</label>
            <input
              type="text"
              defaultValue={userInfo.location.region}
              onChange={(townUser) => setTownUser(townUser.target.value)}
            ></input>
          </div>
          <div className={style.inputTextContainer}>
            <label htmlFor="naissance">Téléphone</label>
            <input
              type="text"
              defaultValue={userInfo.phone}
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
}
