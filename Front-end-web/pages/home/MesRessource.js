import Navigation from "../Navigation";
import style from "../../styles/Home.module.css";
import Image from "next/dist/client/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import utils from "../utils";

export default function () {
  const [allArticle, setAllArticle] = useState(null);

  const getUser = async () =>
    fetch("http://localhost:3001/articles/all", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAllArticle(data.articles);
      });

  useEffect(() => {
    getUser();
  }, []);

  const userCookie = utils();

  if (allArticle != null) {
    const userInfo = JSON.parse(userCookie);
    console.log(userInfo._id);
    allArticle.map((articleInfo) => console.log(articleInfo.articleUser));
    return (
      <div>
        <Navigation></Navigation>
        <div className={style.contentRessourceSave}>
          <div className={style.empty}></div>
          <div className={style.subContentRessourceSave}>
            <p>Recherche :</p>
            <input
              type="search"
              className={style.searchFav}
              placeholder="Titre/Type/Catégorie"
            ></input>
            <table className={style.tableSave}>
              <thead className={style.theadSave}>
                <tr className={style.trSave}>
                  <th className={style.thSave}>Approbation</th>
                  <th className={style.thSave}>Titre</th>
                  <th className={style.thSave}>Type</th>
                  <th className={style.thSave}>Catégorie</th>
                  <th className={style.thSave}>Publication</th>
                </tr>
              </thead>
              <tbody className={style.tbodySave}>
                {allArticle &&
                  allArticle.map(({ key, articleInfo }) => (
                    <tr key={key} className={style.trSave}>
                      <td className={style.tdSave}>50</td>
                      <td className={style.tdSave}>Je suis un titre</td>
                      <td className={style.tdSave}>Image</td>
                      <td className={style.tdSave}>Catégorie</td>
                      <td className={style.tdSave}>
                        <Image
                          className={style.chowIcon}
                          src="/../public/Image/eye-solid.svg"
                          height="30px"
                          width="30px"
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className={style.empty}></div>
        </div>
      </div>
    );
  } else {
    return <div>loading...</div>;
  }
}
