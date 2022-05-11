import style from "../../styles/administration.module.css";
import categorieManager from "../utils/categorieManager";
import { useEffect, useState } from "react";
export default function () {
  const [creationCategorie, setCreationCategorie] = useState("");
  const [suppressionCategorie, setSuppressionCategorie] = useState("");
  const [categorieModifie, setcategorieModifie] = useState("");
  const [modifCategorie, setModifCategorie] = useState("");
  let allCategorie;
  allCategorie = categorieManager();
  console.log(allCategorie);
  const ajoutCategorie = async () => {
    let res = await fetch("http://localhost:3001/category/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: {
          categoryName: creationCategorie,
        },
      }),
    });
    res = await res.json();
  };

  const supprimerCategorie = async () => {
    let res = await fetch(
      "http://localhost:3001/category/delete/" + suppressionCategorie,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    res = await res.json();
  };

  async function activeChange(id, bool) {
    let res = await fetch("http://localhost:3001/category/" + id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: {
          categoryIsActive: bool,
        },
      }),
    });
    res = await res.json();
  }

  async function updateCategorie() {
    let res = await fetch(
      "http://localhost:3001/category/" + categorieModifie,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: {
            categoryName: modifCategorie,
          },
        }),
      }
    );
    res = await res.json();
  }

  function getDeleteCategory(value) {
    setSuppressionCategorie(value.target.value);
    console.log(suppressionCategorie);
  }

  function getUpdateCategory(value) {
    setcategorieModifie(value.target.value);
    console.log(categorieModifie);
  }

  if (allCategorie != null) {
    allCategorie.forEach((element) => {
      console.log(element)
    });
    return (

        <div className={style.categorieContainer}>
          <h2>Ajouter Catégorie</h2>
          <p>Insérer une catégorie</p>
            <input
              type="text"
              placeholder="Insérer une catégorie"
              className={style.inputTextCategorie}
              onChange={(creationCategorie) =>
                setCreationCategorie(creationCategorie.target.value)
              }
            ></input>
            <button
              className={style.buttonValiderCategorie}
              onClick={ajoutCategorie}
            >Enregistrer les modifications</button>

          <h2>Modifier Catégorie</h2>
          <p>Choisissez une catégorie</p>
          <select
            className={style.categorieSelect}
            onChange={getUpdateCategory}
          >
            <option>Séléctionner une catégorie</option>
            {allCategorie &&
              allCategorie.map((categorie) => (
                <option key={categorie._id} value={categorie._id}>
                  {categorie.categoryName}
                </option>
              ))}
          </select>
          <div>
          <p>Insérer une catégorie</p>
          </div>
            <input
              type="text"
              placeholder="Insérer une catégorie"
              className={style.inputTextCategorie}
              onChange={(modifCategorie) =>
                setModifCategorie(modifCategorie.target.value)
              }
            ></input>
            <button
              className={style.buttonValiderCategorie}
              onClick={updateCategorie}
            >Enregistrer les modifications</button>

          <h2>Supprimer Catégorie</h2>

          <p>Choisissez une catégorie</p>
            <select
              className={style.categorieSelect}
              onChange={getDeleteCategory}
            >
              <option>Séléctionner une catégorie</option>
              {allCategorie &&
                allCategorie.map((categorie) => (
                  <option value={categorie._id} key={categorie._id}>
                    {categorie.categoryName}
                  </option>
                ))}
            </select>
            <button
              className={style.buttonValiderCategorie}
              onClick={supprimerCategorie}
            >Enregistrer les modifications</button>
        </div>

    );
  } else {
    return <>loading</>;
  }
  }
