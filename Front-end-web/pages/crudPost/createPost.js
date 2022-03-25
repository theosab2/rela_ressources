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
    const res = await fetch("http://10.176.131.87:3001/article/create", {
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
      <>
        <Navigation></Navigation>
        <div className={style.pageCreate}>
          <div className={style.empty}></div>
          <form encType="multipart/form-data" className={style.createContainer}>
            <div>
              <p>Création d'un post </p>
            </div>
            <div className={style.createPostDropDown}>
              <select
                name="typeRessource"
                id="typeRessource"
                onChange={getType}
              >
                <option value="image">Choisir un type</option>
                <option value="image">Image/Photo</option>
                <option value="video">Video</option>
                <option value="lien">Lien</option>
              </select>

              <select name="categorie" id="categorie" onChange={getCategorie}>
                <option value="">Choisir une catégorie</option>
                {allCategorie &&
                  allCategorie.map((categorie) => (
                    <option key={categorie._id} value="information">
                      {categorie.categoryName}
                    </option>
                  ))}
              </select>
            </div>
            <div className={style.Container}>
              <div className={style.ContainerTitle}>
                <label htmlFor="titre"></label>
                <input
                  className={style.titleInput}
                  type="text"
                  placeholder="Insérer un titre"
                  required
                  onChange={(title) => setTitle(title.target.value)}
                ></input>
              </div>
              {(() => {
                if (typeRessource == "image") {
                  return (
                    <div className={style.ContainerInsert}>
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
                        className={style.imagePreview}
                      />
                    </div>
                  );
                } else if (typeRessource == "video") {
                  return (
                    <div className={style.ContainerInsert}>
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
                        className={style.imagePreview}
                      />
                    </div>
                  );
                } else if (typeRessource == "lien") {
                  return (
                    <div className={style.ContainerInsert}>
                      <p>Lien :</p>
                      <input type="text" placeholder="Insérer un lien"></input>
                    </div>
                  );
                } else {
                  return <div className={style.ContainerInsert}></div>;
                }
              })()}
              <div className={style.ContainerDesc}>
                <textarea
                  className={style.descInput}
                  rows="5"
                  placeholder="Insérer une description"
                  required
                  onChange={(content) => setContent(content.target.value)}
                ></textarea>
              </div>
            </div>
            <div>
              <button
                className={style.buttonSubmit}
                type="submit"
                onClick={display}
              >
                Valider la création
              </button>
            </div>
          </form>
          <div className={style.empty}></div>
        </div>
      </>
    );
  } else return <>loading...</>;
}
