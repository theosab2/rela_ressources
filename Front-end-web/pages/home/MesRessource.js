import Navigation from "../Navigation";
import style from "../../styles/Home.module.css";
import Image from "next/dist/client/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import utils from "../utils";
import cookieManager from "../utils/cookieManager";
import articleManager from "../utils/articleManager";

export default function () {
  let allArticle;
  let array = [];

  allArticle = articleManager();
  const userCookie = cookieManager();

  if (allArticle != null) {
    const userInfo = JSON.parse(userCookie);

    allArticle.forEach((element) => {
      if (element.articleCreator == userInfo._id) {
        array.push(element);
      }
    });

    console.log(allArticle);
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
                  array.map((articleInfo) => (
                    <tr className={style.trSave}>
                      <td className={style.tdSave}>
                        {articleInfo.articleIsApproved
                          ? "Approuvé"
                          : "Non approuvé"}
                      </td>
                      <td className={style.tdSave}>
                        {articleInfo.articleTitle}
                      </td>
                      <td className={style.tdSave}>Image</td>
                      <td className={style.tdSave}>Photographie</td>
                      <td className={style.tdSave}>
                        <Link href={`../crudPost/${articleInfo._id}`}>
                          <a>
                            <Image
                              className={style.chowIcon}
                              src="/../public/Image/eye-solid.svg"
                              height="30px"
                              width="30px"
                            />
                          </a>
                        </Link>
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
