import style from "../../styles/administration.module.css";
import categorieManager from "../utils/categorieManager";
import { useEffect, useState } from "react";
export default function () {
  const [creationCategorie, setCreationCategorie] = useState("");
  let allCategorie;
  allCategorie = categorieManager();
  console.log(allCategorie);

  const ajoutCategorie = async () => {
    const res = await fetch("http://localhost:3000/category/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          categoryName: creationCategorie,
        },
      }),
    });
    res = await res.json();
  };

  return (
    <>
      <h1>Ajouter Catégorie</h1>
      <div className={style.ajouterCategorie}>
        <input
          type="text"
          placeholder="Insérer une catégorie"
          className={style.inputTextCategorie}
          onChange={(creationCategorie) =>
            setCreationCategorie(creationCategorie.target.value)
          }
        ></input>
        <input
          type="submit"
          value="Valider"
          className={style.buttonValiderCategorie}
          onClick={ajoutCategorie}
        ></input>
      </div>
      <h1>Modifier Catégorie</h1>
      <select>
        {allCategorie &&
          allCategorie.map((categorie) => <option>{categorie}</option>)}
      </select>
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
      <h1>Supprimer Catégorie</h1>
      <select>
        {allCategorie &&
          allCategorie.map((categorie) => <option>{categorie}</option>)}
      </select>
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
