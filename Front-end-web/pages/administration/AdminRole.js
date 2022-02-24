import style from "../../styles/administration.module.css";
import { useEffect, useState } from "react";

export default function (props) {
  let [adminPage, setAdminPage] = useState("");
  let [idUser, setIdUser] = useState(null);
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
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Role</th>
                <th>Modifer</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>12/09/2000</td>
                <td>Je suis un titre</td>
                <td>
                  <input
                    type="button"
                    value={"Valider"}
                    onClick={() => openModal(21)}
                    className={style.modifierRole}
                  ></input>
                </td>
              </tr>
              <tr>
                <td>12/09/2000</td>
                <td>Je suis un titre</td>
                <td>
                  <input
                    type="button"
                    value={"Valider"}
                    onClick={() => openModal(18)}
                    className={style.modifierRole}
                  ></input>
                </td>
              </tr>
              <tr>
                <td>12/09/2000</td>
                <td>Je suis un titre</td>
                <td>
                  <input
                    type="button"
                    value={"Valider"}
                    onClick={() => openModal(7)}
                    className={style.modifierRole}
                  ></input>
                </td>
              </tr>
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
