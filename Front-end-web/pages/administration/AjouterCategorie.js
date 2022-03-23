import style from "../../styles/administration.module.css";
export default function () {
  return (
    <>
      <h1>Ajouter Catégorie</h1>
      <div className={style.ajouterCategorie}>
        <input
          type="text"
          placeholder="Insérer une catégorie"
          className={style.inputTextCategorie}
        ></input>
        <input
          type="submit"
          value="Valider"
          className={style.buttonValiderCategorie}
        ></input>
      </div>
    </>
  );
}
