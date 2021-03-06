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
    let res = await fetch("http://"+process.env.IP+"/ut/create", {
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
      "http://"+process.env.IP+"/category/delete/" + suppressionCategorie,
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
    let res = await fetch("http://"+process.env.IP+"/category/" + id, {
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
      "http://"+process.env.IP+"/ut/" + categorieModifie,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ut: {
            name: modifCategorie,
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
          <h2>Ajouter Cat??gorie</h2>
          <p>Ins??rer une cat??gorie</p>
            <input
              type="text"
              placeholder="Ins??rer une cat??gorie"
              className={style.inputTextCategorie}
              onChange={(creationCategorie) =>
                setCreationCategorie(creationCategorie.target.value)
              }
            ></input>
            <button
              className={style.buttonValiderCategorie}
              onClick={ajoutCategorie}
            >Enregistrer les modifications</button>

          <h2>Modifier Cat??gorie</h2>
          <p>Choisissez une cat??gorie</p>
          <select
            className={style.categorieSelect}
            onChange={getUpdateCategory}
          >
            <option>S??l??ctionner une cat??gorie</option>
            {allCategorie &&
              allCategorie.map((categorie) => (
                <option key={categorie._id} value={categorie._id}>
                  {categorie.name}
                </option>
              ))}
          </select>
          <div>
          <p>Ins??rer une cat??gorie</p>
          </div>
            <input
              type="text"
              placeholder="Ins??rer une cat??gorie"
              className={style.inputTextCategorie}
              onChange={(modifCategorie) =>
                setModifCategorie(modifCategorie.target.value)
              }
            ></input>
            <button
              className={style.buttonValiderCategorie}
              onClick={updateCategorie}
            >Enregistrer les modifications</button>

          <h2>Supprimer Cat??gorie</h2>

          <p>Choisissez une cat??gorie</p>
            <select
              className={style.categorieSelect}
              onChange={getDeleteCategory}
            >
              <option>S??l??ctionner une cat??gorie</option>
              {allCategorie &&
              allCategorie.map((categorie) => (
                <option key={categorie._id} value={categorie._id}>
                  {categorie.name}
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
