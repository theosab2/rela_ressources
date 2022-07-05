import Navigation from "../Navigation";
import style from "../../styles/crudPost.module.css";
import categorieManager from "../utils/categorieManager";
import Image from "next/dist/client/image";
import React, { useState } from "react";
import utils from "../utils";
import { useEffect } from "react";
import { create } from "../../../Back-end/models/article";
import cookieManager from "../utils/cookieManager";

export default function createPost() {
  
  let allCategorie;
  allCategorie = categorieManager();

  let cookie = cookieManager()

  const [typeRessource, setTypeRessource] = useState(null);
  const [CategorieRessource, setCategorieRessource] = useState(null);
  let [inputFile, setInputFile] = useState(null);

  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [image, setImage] = useState(null);

  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [userId, setUserId] = useState(null);

  const [createdArticleId,setCreatedArticleId] = useState(null)

  const [contents, setContents] = useState([]);
  const [contentsMedias, setContentsMedias] = useState([]);
  const [contentsMediasObjectURL, setContentsMediasObjectURL] = useState([]);

  const [message,setMessage] = useState(null)

  useEffect(() => {
    if (window) { 
      window.sessionStorage.setItem("Page", "Creer" );
    }
  }, []);

  const addNewContent = () => {
    let newContents = contents;
    newContents.push({
      hasMedia:false
    });
    setContents(newContents);
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

  const uploadContentsMediasToClient = (event) => {
    console.log("evt",event)
    if(typeof(event) != typeof(undefined))
    {
      if (event.target.files[0]) {
          console.log("target file", event.target.files[0])
      
          const media = event.target.files[0];
          console.log("media: ",media);

          //set media name
          let newContents = contents;
          newContents[parseInt(event.target.id.replace("content-file-",""))].name = media.name
          newContents[parseInt(event.target.id.replace("content-file-",""))].hasMedia = true
          setContents(newContents)
  
          let newContentsMedias = contentsMedias;
          newContentsMedias[parseInt(event.target.id.replace("content-file-",""))] = media
          setContentsMedias(newContentsMedias);
  
          let newContentsMediasObjectURL = contentsMediasObjectURL;
          var objUrl = URL.createObjectURL(media);
          newContentsMediasObjectURL[parseInt(event.target.id.replace("content-file-",""))] = objUrl;
          setContentsMediasObjectURL(newContentsMediasObjectURL);
      }
    };
    displayArticleContents();
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
      creator : cookie._id,
      isApproved: true,
      isActive: true,
      privacyIsPublic: true,
      contents:contents
    });

    formdata.append("article", JSON_Object);
    const res = await fetch("http://"+process.env.IP+":3001/article/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "user-upload-GUID": cookie._id,
      },
      body: formdata,
    });
    var responseBody = await res.json()

    if (res.status != 201) {
      console.log(res.status);
      setMessage("Erreur impossible d'enregistrer la ressource")
    }
    else {
      console.log("Réussite");
      console.log("response body", responseBody)
      console.log("newlyCreatedArticle_id", responseBody.newlyCreatedArticle_id)
      setCreatedArticleId(responseBody.newlyCreatedArticle_id);
      sendArticleContents(responseBody.newlyCreatedArticle_id);
      setMessage("Article envoyé")
    }
  };

  const sendArticleContents= async (newlyCreatedArticleId) => {
    for (let index = 0; index < contents.length; index++) {
      const content = contents[index];
      if(content.hasMedia == true)
      {
        await sendContent(newlyCreatedArticleId,content,index)
      }
    }
  };

  const sendContent = async (newlyCreatedArticleId,content, contentsCounter) => {
      console.log("send : ",contentsCounter)
      
      delete content.hasMedia
      var formdata = new FormData();
      var content_JSON_Object = JSON.stringify({
        ...content,
        contentIndex:contentsCounter
      });

      console.log("content_JSON_Object :",content_JSON_Object)

      formdata.append("content", content_JSON_Object);  
      formdata.append("content-media", contentsMedias[contentsCounter]);

      const res = await fetch("http://"+process.env.IP+":3001/article/set-content-media/"+newlyCreatedArticleId, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "user-upload-GUID": userCookie._id,
        },
        body: formdata
      });

      var responseBody = await res.json();

      if (res.status != 201) {
        console.log(res.status);
        return 0;
      }
      else {
        console.log("ajout media content : Réussite");
        console.log("response body", responseBody)
        return 1;
      }
  }


  const displayArticleContents = () => {
    let contentsCounter = 0;

    document.getElementById("article-contents-div").innerHTML = "";
    contents.forEach(content => {

      document.getElementById("article-contents-div").innerHTML += `
      <div 
        class=${style.articleContentDiv}
      >
        <label htmlFor="content-file-${contentsCounter}" class=${style.addContentMedia}>
        +
        </label>
        <input 
          id="content-file-${contentsCounter}" 
          className=${style.inputFile} 
          type="file"                         
          accept="image/*, .pdf,video/*"*
        >
        </input>
        <div >
          <img
            id=output-content-${contentsCounter}
            src=${contentsMediasObjectURL[contentsCounter]}
            class=${style.uploadImage}
          />
        </div>
      </div>
      `
      document.getElementById(`content-file-${contentsCounter}`).addEventListener("change",uploadContentsMediasToClient)

      contentsCounter++;
    });
  };
  

  function getType(value) {
    setTypeRessource(value.target.value);
  }

  function getCategorie(value) {
    setCategorieRessource(value.target.value);
  }

  if (cookie != false) {
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
              {/*<select
                name="typeRessource"
                id="typeRessource"
                onChange={getType}
                className={style.dropdownList}
              >
                <option value="image">Choisir un type de fichier</option>
                <option value="image">Image/Photo</option>
                <option value="video">Video</option>
                <option value="lien">Lien</option>
              </select>*/}
              </div>
               <img
                  id="output"
                  src={createObjectURL}
                  className={style.uploadImage}
                />
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
            </div>
                <div id="article-contents-div" className={style.articleAddContentContainer}>
                  
                </div>
                <button
                    className={style.articleAddContent}
                    type="button"
                    onClick={addNewContent}
                  >
                    + Ajouter un élément
                  </button>
                  {message 
                  ?<div className={style.messageReussite}>{message}</div>
                  :<div className={style.messageErreur}>{message}</div>
                  }
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
