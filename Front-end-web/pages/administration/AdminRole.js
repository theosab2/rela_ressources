import style from "../../styles/administration.module.css";
import { useEffect, useState } from "react";

export default function (props) {
  let [adminPage, setAdminPage] = useState("");

  function handleChange(event) {
    // Here, we invoke the callback with the new value
    props.onChange(event.target.value);
  }

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
                    onClick={handleChange}
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
                    onClick={handleChange}
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
                    onClick={handleChange}
                    className={style.modifierRole}
                  ></input>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
