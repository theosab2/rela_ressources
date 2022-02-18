import Navigation from "../Navigation";
import style from "../../styles/crudPost.module.css";
import Image from "next/dist/client/image";
import { useState } from "react";

export default function createPost() {
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [image, setImage] = useState(null);

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
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

  return (
    <>
      <Navigation></Navigation>
      <div className={style.pageCreate}>
        <div className={style.empty}></div>
        <div className={style.createContainer}>
          <div>
            <p>Création d'un post </p>
          </div>
          <div className={style.Container}>
            <div className={style.ContainerTitle}>
              <label htmlFor="titre"></label>
              <input
                className={style.titleInput}
                type="text"
                value=""
                placeholder="Insérer un titre"
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
                value=""
                placeholder="Insérer une description"
              ></textarea>
            </div>
          </div>
          <div>
            <button className={style.buttonSubmit} type="submit">
              Valider la création
            </button>
          </div>
        </div>
        <div className={style.empty}></div>
      </div>
    </>
  );
}
