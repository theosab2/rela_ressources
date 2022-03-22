import Navigation from "../Navigation";
import style from "../../styles/Home.module.css";
import Image from "next/dist/client/image";
import Link from "next/link";

export default function () {
  const showModal = () => {
    document.getElementById("myModal").style.display = "block";
  };

  const closeModal = () => {
    document.getElementById("myModal").style.display = "none";
  };
  return (
    <div>
      <Navigation></Navigation>
      <div className={style.contentRessourceSave}>
        <div className={style.empty}></div>
        <div className={style.subContentRessourceSave}>
          <p>Recherche :</p>
          <input
            type="search"
            className={style.searchFav}
            placeholder="Titre/Type/Catégorie/Créateur"
          ></input>
          <table className={style.tableSave}>
            <thead className={style.theadSave}>
              <tr className={style.trSave}>
                <th className={style.thSave}>Createur</th>
                <th className={style.thSave}>Titre</th>
                <th className={style.thSave}>Type</th>
                <th className={style.thSave}>Catégorie</th>
                <th className={style.thSave}>Publication</th>
              </tr>
            </thead>
            <tbody className={style.tbodySave}>
              <tr className={style.trSave}>
                <td className={style.tdSave}>Jean</td>
                <td className={style.tdSave}>Je suis un titre</td>
                <td className={style.tdSave}>Image</td>
                <td className={style.tdSave}>Catégorie</td>
                <td className={style.tdSave}>
                  <Image
                    className={style.chowIcon}
                    src="/../public/Image/eye-solid.svg"
                    height="30px"
                    width="30px"
                    onClick={showModal}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={style.empty}></div>
      </div>
      <div id="myModal" className={style.modal}>
        <div className={style.modal_content}>
          <span className={style.close} onClick={closeModal}>
            &times;
          </span>
        </div>
      </div>
    </div>
  );
}
