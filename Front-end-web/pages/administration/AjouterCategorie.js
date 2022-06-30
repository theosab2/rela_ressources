import style from "../../styles/administration.module.css";
import categorieManager from "../utils/categorieManager";
import { useEffect, useState } from "react";
export default function ajouterCategorie() {
  const [creationCategorie, setCreationCategorie] = useState("");
  const [suppressionCategorie, setSuppressionCategorie] = useState("");
  const [categorieModifie, setcategorieModifie] = useState("");
  const [modifCategorie, setModifCategorie] = useState("");
  let allCategorie;

  useEffect(() => {
    if (window) { 
      window.sessionStorage.setItem("Page", "Categorie" );
    }
  }, []);

  allCategorie = categorieManager();
  const ajoutCategorie = async () => {
    let res = await fetch("http://"+process.env.IP+":3001/ut/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ut:{
          code: "CATEGORY",
          name: creationCategorie,
        }
      }),
    });
    res = await res.json();
  };

  const supprimerCategorie = async () => {
    let res = await fetch(
      "http://"+process.env.IP+":3001/category/delete/" + suppressionCategorie,
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
    let res = await fetch("http://"+process.env.IP+":3001/category/" + id, {
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
    console.log(categorieModifie)
    let res = await fetch(
      "http://"+process.env.IP+":3001/ut/" + categorieModifie,
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
  }

  function getUpdateCategory(value) {
    setcategorieModifie(value.target.value);
  }

  if (allCategorie != null) {
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
                  {categorie.name}
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
