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
      console.log();
    });
    return (
      <>
        <form>
          <div className={style.tabHistorique}>
            <table>
              <thead>
                <tr>
                  <th>Catégorie</th>
                  <th>Etat</th>
                  <th>Modifier Etat</th>
                </tr>
              </thead>
              <tbody>
                {allCategorie &&
                  allCategorie.map((categorie) => (
                    <tr key={categorie._id}>
                      <td>{categorie.categoryName}</td>
                      <td>
                        {categorie.categoryIsActive ? "Actif" : "Innactif"}
                      </td>
                      <td>
                        <input
                          type="submit"
                          value={
                            categorie.categoryIsActive
                              ? "Activer"
                              : "Désactiver"
                          }
                          onClick={() =>
                            categorie.categoryIsActive
                              ? activeChange(categorie._id, false)
                              : activeChange(categorie._id, true)
                          }
                        ></input>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

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
          <div className={style.ajouterCategorie}>
            <input
              type="text"
              placeholder="Insérer une catégorie"
              className={style.inputTextCategorie}
              onChange={(modifCategorie) =>
                setModifCategorie(modifCategorie.target.value)
              }
            ></input>
            <input
              type="submit"
              value="Valider"
              className={style.buttonValiderCategorie}
              onClick={updateCategorie}
            ></input>
          </div>
          <h1>Supprimer Catégorie</h1>

          <div className={style.ajouterCategorie}>
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
            <input
              type="submit"
              value="Valider"
              className={style.buttonValiderCategorie}
              onClick={supprimerCategorie}
            ></input>
          </div>
        </form>
      </>
    );
  } else {
    return <>loading</>;
  }
}
