import Navigation from "../Navigation";
import style from "../../styles/crudPost.module.css";
import categorieManager from "../utils/categorieManager";
import Image from "next/dist/client/image";
import React, { useState } from "react";
import utils from "../utils";
import { useEffect } from "react";

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

  const [contents, setContents] = useState([]);
  const [contentsMedia, setContentsMedia] = useState([]);
  const [contentsMediaObjectURL, setContentsMediaObjectURL] = useState([]);

  useEffect(() => {
    if (window) { 
      window.sessionStorage.setItem("Page", "Creer" );
    }
  }, []);

  const addNewContent = () => {
    let newContents = contents;
    newContents.push({});
    setContents(newContents);
    console.log("contents : ",contents)
    displayArticleContents();
  }

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
      console.log(image);
    }
  };

  const uploadContentMediasToClient = (event) => {
    console.log(event)
    if(typeof(event) != typeof(undefined))
    {
      if (event.target.files && event.target.files[0]) {
        console.log("files")
      
        for (let i = 0; i < event.target.files.length; i++) {
          console.log("file: ",event.target.files[i]);

          const media = event.target.files[i];
  
          let newContentsMedia = contentsMedia;
          newContentsMedia[event.target.id.replace()].push(newContentsMedia)
          setContentsMedia(newContentsMedia);
  
          let newContentsMediaObjectURL = contentsMediaObjectURL;
          newContentsMediaObjectURL.push(URL.createObjectURL(media))
          setContentsMediaObjectURL(newContentsMediaObjectURL);
        }
      }
    };
  };
  
  const display = async () => {
    // create array with 2 images 
    /*
    var images = [];
    images.push(image)
    images.push(image)

    formdata.append("content-images", images);
    */
    var formdata = new FormData();
    formdata.append("article-image", image);
    var contentMedias = [];
    
    var JSON_Object = JSON.stringify({
      articleCategory_TTids: CategorieRessource,
      title: title,
      description: content,
      creator : userCookie._id,
      isApproved: true,
      isActive: true,
      privacyIsPublic: true,
    });

    formdata.append("article", JSON_Object);
    const res = await fetch("http://"+process.env.IP+":3001/article/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "user-upload-GUID": userCookie._id,
      },
      body: formdata,
    });
    
    console.log(res.status);
    if (res.status != "SUCESS") {
      console.log(res.status);
    } 
    else {
      console.log("Réussite");
    }

    sendArticleContents()
  };

  const sendArticleContents= async () => {
    var formdata = new FormData();

    var contentMedia = image;
    var contentMedias = [];
    contentMedias.push(contentMedia)

    formdata.append("content-images", contentMedias);

    
    var JSON_Object = JSON.stringify({
      contents:[
        
      ]//TODO : add content state
    });

    const res = await fetch("http://"+process.env.IP+":3001/article/add-contents", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "user-upload-GUID": userCookie._id,
      },
      body: formdata,
    });

  };

  const displayArticleContents = () => {
    let contentsCounter = 0;
    var toReturn = "";               

    document.getElementById("article-contents-div").innerHTML = "";
    contents.forEach(content => {
      contentsCounter++;
      console.log(contentsCounter);
      console.log(style.articleContentDiv);

      document.getElementById("article-contents-div").innerHTML += `
      <div 
        class=${style.articleContentDiv}
      >
        <label htmlFor={content-file-${contentsCounter}} className={style.addContentMedia}>
        +
        </label>
        <input 
          id={content-file-${contentsCounter}} 
          className={style.inputFile} 
          type="file"                         
          accept="image/*, .pdf,video/*"
          onChange=${uploadContentMediasToClient()}>
        </input>
        <div >
          <img
            id={output-content-${contentsCounter}}
            src={contentsMediaObjectURL[${contentsCounter -1}]}
            className={style.uploadImage}
          />
        </div>
      </div>
      `
      setTimeout(() => {
        console.log(document.getElementById(`content-file-${contentsCounter}`));
        
        document.getElementById(`content-file-${contentsCounter}`).addEventListener("change",uploadContentMediasToClient())
      }, 500);
    });
  };

  function getType(value) {
    setTypeRessource(value.target.value);
  }

  function getCategorie(value) {
    setCategorieRessource(value.target.value);
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
                  <label htmlFor="file" className={style.addRessource}>
                    +
                  </label>
                  <input id="file" 
                  className={style.inputFile} 
                  type="file"                         
                  accept="image/*, .pdf,video/*"
                  onChange={uploadToClient}>
                  </input>
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
              {(() => {
                if (typeRessource == "image") {
                  return (
                    <div >
                      <img
                        id="output"
                        src={createObjectURL}
                        className={style.uploadImage}
                      />
                    </div>
                  );
                } 
                else if (typeRessource == "video") {
                  return (
                    <div >
                      <img
                        id="output"
                        src={createObjectURL}
                        className={style.uploadImage}
                      />
                    </div>
                  );
                } 
                else if (typeRessource == "lien") {
                  return (
                    <div >
                      <p>Lien :</p>
                      <input type="text" placeholder="Insérer un lien"></input>
                    </div>
                  );
                } 
                else {
                  return <>              <img
                  id="output"
                  src={createObjectURL}
                  className={style.uploadImage}
                /></>;
                }
              })()}
              <div>
                <textarea
                  className={style.descriptionRessource}
                  rows="5"
                  placeholder="Insérer une description"
                  required
                  onChange={(content) => setContent(content.target.value)}
                ></textarea>
              </div>
            <select name="categorie" 
            id="categorie" 
            onChange={getCategorie}
            className={style.dropdownListCategorie}>
                <option value="">Choisir une catégorie</option>
                {allCategorie &&
                  allCategorie.map((categorie) => (
                    <option key={categorie._id} value="information">
                      {categorie.name}
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
                <div id="article-contents-div">
                  
                </div>
                <button
                    className={style.articleAddContent}
                    type="button"
                    onClick={addNewContent}
                  >
                    Ajouter un élément
                  </button>
              <button
                className={style.validateRessource}
                type="submit"
                onClick={display}
              >
                Valider
              </button>

        </div>
    );
  } else return <>loading...</>
}
