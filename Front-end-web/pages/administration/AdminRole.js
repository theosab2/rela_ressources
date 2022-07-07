import style from "../../styles/administration.module.css";
import { useEffect, useState } from "react";
import userManager from "../utils/userManager";
import Image from "next/dist/client/image";
import ComponentAdminRole from "./ComponentAdminRole";


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
  fetch("http://"+process.env.IP+"/users/all", {
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
      {allUser && allUser.map((users) => (
        <ComponentAdminRole users={users} key={users._id}/>
        ))}
      </div>
    </>
  );
}
