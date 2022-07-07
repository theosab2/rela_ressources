import Navigation from "../Navigation";
import style from "../../styles/administration.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function () {
  const [userInfo, setUserInfo] = useState(null);
  const [modalUserInfo, setModalUserInfo] = useState(null);

  const showModal = (data) => {
    setModalUserInfo(data);
    document.getElementById("myModal").style.display = "block";
  };

  const closeModal = () => {
    document.getElementById("myModal").style.display = "none";
  };

  const getUser = async () =>
    fetch("http://"+process.env.IP+"/users/all", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data.users);
      });

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className={style.createContainer}>
        <div className={style.tabHistorique}>
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Adresse mail</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userInfo &&
                userInfo.map((users) => (
                  <tr>
                    <td>{users.name}</td>
                    <td>{users.firstname}</td>
                    <td>{users.email}</td>
                    <td>
                      <input
                        type="button"
                        className={style.buttonModerateUser}
                        value="Modérer le compte"
                        onClick={() => showModal(users)}
                      ></input>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div id="myModal" className={style.modal}>
          <div className={style.modalModerate}>
            <span className={style.close} onClick={closeModal}>
              &times;
            </span>

            <div className={style.modalModerateInput}>
              <p>Modération d'utilisateur :</p>
              <label htmlFor="Nom">Nom</label>
              <input
                type="text"
                defaultValue={modalUserInfo && modalUserInfo.name}
              ></input>
              <label htmlFor="Prenom">Prenom</label>
              <input
                type="text"
                defaultValue={modalUserInfo && modalUserInfo.firstname}
              ></input>
              <label htmlFor="Mail">Mail</label>
              <input
                type="text"
                defaultValue={modalUserInfo && modalUserInfo.email}
              ></input>
              <label htmlFor="isActive">Status</label>
              <select id="isActive">
                <option value="true">Activer</option>
                <option value="false">Désactiver</option>
              </select>
              <input type="submit" value="Valider"></input>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
