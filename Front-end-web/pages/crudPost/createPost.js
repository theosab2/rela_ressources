import Navigation from "../Navigation";
import style from "../../styles/crudPost.module.css";
import categorieManager from "../utils/categorieManager";
import Image from "next/dist/client/image";
import { useState } from "react";
import utils from "../utils";

export default function createPost() {
  let allCategorie;
  allCategorie = categorieManager();

  const [typeRessource, setTypeRessource] = useState(null);
  const [CategorieRessource, setCategorieRessource] = useState(null);
  let [inputFile, setInputFile] = useState(null);

  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [image, setImage] = useState(null);

  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [userId, setUserId] = useState(null);

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const display = async () => {
    var formdata = new FormData();
    console.log(image);
    formdata.append("article-image", image);

    var JSON_Object = JSON.stringify({
      articleCreator: JSON.parse(userCookie)._id,
      articleIsApproved: true,
      articleCategory_TTids: CategorieRessource,
      articleTitle: title,
      articleDescription: content,
    });
    console.log(JSON_Object);
    formdata.append("article", JSON_Object);
    console.log(formdata);
    const res = await fetch("http://localhost:3001/article/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "user-upload-GUID": JSON.parse(userCookie)._id,
      },
      body: formdata,
    });
    res = await res.json();
    if (res.status != "SUCESS") {
      console.log("Erreur");
    } else {
      console.log("Réussite");
    }
  };

  function getType(value) {
    setTypeRessource(value.target.value);
    console.log(typeRessource);
  }

  function getCategorie(value) {
    setCategorieRessource(value.target.value);
    console.log(CategorieRessource);
  }

  const userCookie = utils();
  if (userCookie != false) {
    return (
        <div className={style.crudContainer}>
              <h1>Créer votre ressource</h1>
                <label htmlFor="titre"></label>
                <input
                  
                  type="text"
                  placeholder="Ajouter un titre"
                  required
                  onChange={(title) => setTitle(title.target.value)}
                  className={style.inputText}
                ></input>
                <div className={style.addRessourceContainer}>
                  <button className={style.addRessource}>
                    +
                  </button>
              <select
                name="typeRessource"
                id="typeRessource"
                onChange={getType}
                className={style.dropdownList}
              >
                <option value="image">Choisir un type de fichier</option>
                <option value="image">Image/Photo</option>
                <option value="video">Video</option>
                <option value="lien">Lien</option>
              </select>
              </div>
              <div >
                <textarea
                  className={style.descriptionRessource}
                  rows="5"
                  placeholder="Insérer une description"
                  required
                  onChange={(content) => setContent(content.target.value)}
                ></textarea>
              </div>
              

            <div >

              {(() => {
                if (typeRessource == "image") {
                  return (
                    <div >
                      <p>Insérer une Image :</p>
                      <input
                        type="file"
                        name="image"
                        accept="image/*, .pdf,video/*"
                        onChange={uploadToClient}
                      ></input>
                      <img
                        id="output"
                        src={createObjectURL}
                        
                      />
                    </div>
                  );
                } else if (typeRessource == "video") {
                  return (
                    <div >
                      <p>Insérer une vidéo :</p>
                      <input
                        type="file"
                        name="vidFile"
                        accept="video/*"
                        onChange={uploadToClient}
                      ></input>
                      <img
                        id="output"
                        src={createObjectURL}
                        
                      />
                    </div>
                  );
                } else if (typeRessource == "lien") {
                  return (
                    <div >
                      <p>Lien :</p>
                      <input type="text" placeholder="Insérer un lien"></input>
                    </div>
                  );
                } else {
                  return <div ></div>;
                }
              })()}

            </div>
            <select name="categorie" 
            id="categorie" 
            onChange={getCategorie}
            className={style.dropdownListCategorie}>
                <option value="">Choisir une catégorie</option>
                {allCategorie &&
                  allCategorie.map((categorie) => (
                    <option key={categorie._id} value="information">
                      {categorie.categoryName}
                    </option>
                  ))}
              </select>
              <div className={style.privateRessource}>
              <input
                id="condition"
                name="condition"
                type="checkbox"
                required

              />
              <label htmlFor="condition">
                Cette publication est privée
              </label>
            </div>
              <button
                className={style.validateRessource}
                type="submit"
                onClick={display}
              >
                Valider
              </button>

        </div>
    );
  } else return <>loading...</>;
}
