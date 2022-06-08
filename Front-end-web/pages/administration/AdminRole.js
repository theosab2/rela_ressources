import style from "../../styles/administration.module.css";
import { useEffect, useState } from "react";
import userManager from "../utils/userManager";
import Image from "next/dist/client/image";

export default function Role(props) {
  let [adminPage, setAdminPage] = useState("");
  let [idUser, setIdUser] = useState(null);
  let [allUser,setAllUser] = useState(null);

  useEffect(() => {
    if (window) { 
      window.sessionStorage.setItem("Page", "Utilisateur" );
    }
  }, []);

  const getUser = async () =>
  fetch("http://localhost:3001/users/all", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      setAllUser(data.users);
    });
    console.log("test")

useEffect(() => {
  getUser();
}, []);

  function handleChange(event) {
    props.onChange(event.target.value);
  }

  const openModal = (id) => {
    setIdUser(id);
    document.getElementById("myModal").style.display = "block";
  };

  const closeModal = () => {
    setIdUser(null);
    document.getElementById("myModal").style.display = "none";
  };

  return (
    <>
      <div className={style.adminRoleContainer}>
      <input type="text" placeholder="Recherche" className={style.searchBar}></input>
      {allUser &&
                allUser.map((users) => (
        <div className={style.adminRoleUserContainer}>
        <div>
        <Image
            src={"/../public/Image/connexion.png"}
            atl={"icon connexion"}
            width={50}
            height={50}
          />
          <p>MarieMal90</p>
        </div>
        <div>
        <img
            src={"/Image/user.png"}
            className={style.userIcon}
          />
          <p>184</p>
        </div>
        <img
            src={"/Image/comment.png"}
            className={style.userIcon}
          />
          <div>
          <img
            src={"/Image/warning.png"}
            className={style.userIcon}
          />
          <p>0</p>
          </div>
          <img
            src={"/Image/delete.png"}
            className={style.userIcon}
          />
          <div>
          <select
            className={style.categorieSelect}
          >
            <option>Utilisateur</option>
          </select>
          <button>Valider</button>
          </div>
        </div>
                ))}
      </div>
    </>
  );
}
