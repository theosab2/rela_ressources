import style from "../../styles/administration.module.css";
import { useEffect, useState } from "react";
import userManager from "../utils/userManager";

export default function (props) {
  let [adminPage, setAdminPage] = useState("");
  let [idUser, setIdUser] = useState(null);
  let allUser;
  allUser = userManager();
  console.log(allUser);
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
      <div className={style.createContainer}>
        <div className={style.tabRole}>
          <table className={style.tableSave}>
            <thead className={style.theadSave}>
              <tr className={style.trSave}>
                <th className={style.thSave}>email</th>
                <th className={style.thSave}>Prénom</th>
                <th className={style.thSave}>Nom</th>
                <th className={style.thSave}>Rôle</th>
                <th className={style.thSave}>Nom d'utilisateur</th>
                <th className={style.thSave}>Téléphone</th>
                <th className={style.thSave}>Modifier rôle </th>
                <th className={style.thSave}>Modifier</th>
              </tr>
            </thead>
            <tbody className={style.tbodySave}>
              {allUser &&
                allUser.map((userInfo) => (
                  <tr className={style.trSave}>
                    <td className={style.tdSave}>{userInfo.email}</td>
                    <td className={style.tdSave}>{userInfo.firstname}</td>
                    <td className={style.tdSave}>{userInfo.name}</td>
                    <td className={style.tdSave}>{userInfo.role}</td>
                    <td className={style.tdSave}>{userInfo.username}</td>
                    <td className={style.tdSave}>{userInfo.phone}</td>
                    <td className={style.tdSave}>
                      <select>
                        <option value="Admin">Administrateur</option>
                        <option value="Moderateur">Modérateur</option>
                        <option value="Citoyen">Citoyen</option>
                      </select>
                    </td>
                    <td className={style.tdSave}>
                      <input
                        type="button"
                        value={"Valider"}
                        onClick={() => openModal(21)}
                        className={style.modifierRole}
                      ></input>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div id="myModal" className={style.modal}>
        <div className={style.modalUpdateRole}>
          <span className={style.close} onClick={closeModal}>
            &times;
          </span>
          <>
            <div className={style.AdminModifRoleContainer}>
              <label>Nom</label>
              <input type="text" defaultValue={idUser}></input>
              <label>Prenom</label>
              <input type="text"></input>
              <label>nom utilisateur</label>
              <input type="text"></input>
              <label>Role</label>
              <input type="text"></input>
              <input type="button" value="valider"></input>
            </div>
          </>
        </div>
      </div>
    </>
  );
}
