import Navigation from "../Navigation";
import style from "../../styles/crudPost.module.css";
import Image from "next/dist/client/image";
import { useState } from "react";
import utils from "../utils";

export default function createPost() {
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
    console.log("aaa");
    const res = await fetch("http://localhost:3001/article/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        article: {
          articleUser: JSON.parse(userCookie)._id,
          articleIsModerate: true,
          articleCategory: "catégorie de test",
          articleName: title,
          articleContent: content,
        },
      }),
    });
    res = await res.json();
    if (res.status != "SUCESS") {
      console.log("Erreur");
    } else {
      console.log("Réussite");
    }
  };

  //Fonction à utiliser pour ul=pload le fichier sur le serveur
  /*const uploadToServer = async (event) => {
    const body = new FormData();
    body.append("file", image);
    const response = await fetch("/api/file", {
      method: "POST",
      body,
    });
  };*/
  const userCookie = utils();
  if (userCookie != false) {
    return (
      <>
        <Navigation></Navigation>
        <div className={style.pageCreate}>
          <div className={style.empty}></div>

          <form className={style.createContainer}>
            <div>
              <p>Création d'un post </p>
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
              <div className={style.ContainerInsert}>
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={uploadToClient}
                ></input>
                <img
                  id="output"
                  src={createObjectURL}
                  className={style.imagePreview}
                />
              </div>
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
