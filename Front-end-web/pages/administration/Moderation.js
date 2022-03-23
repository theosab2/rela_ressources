import Navigation from "../Navigation";
import style from "../../styles/administration.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import articleManager from "../utils/articleManager";
import Link from "next/link";

export default function () {
  let allArticle;
  allArticle = articleManager();
  console.log(allArticle);

  async function modererArticle(id, bool) {
    console.log(id);
    let res = await fetch("http://localhost:3001/article/" + id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        article: {
          articleIsApproved: bool,
        },
      }),
    });
    res = await res.json();
  }

  return (
    <>
      <div className={style.createContainer}>
        <div className={style.tabHistorique}>
          <table>
            <thead>
              <tr>
                <th>Approbation</th>
                <th>Titre publication</th>
                <th>Nom du publicateur</th>
                <th>Catégorie</th>
                <th>Voir publication</th>
                <th>Supprimer la publication</th>
              </tr>
            </thead>
            <tbody>
              {allArticle &&
                allArticle.map((articleInfo) => (
                  <tr key={articleInfo._id}>
                    <td>
                      {articleInfo.articleIsApproved
                        ? "Approuvé"
                        : "Désaprouvé"}
                    </td>
                    <td>{articleInfo.articleName}</td>
                    <td>{articleInfo.articleContent}</td>
                    <td>{articleInfo.articleCategory}</td>
                    <td>
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
                    <td>
                      <form>
                        <input
                          type="submit"
                          value={
                            articleInfo.articleIsApproved
                              ? "Désaprouver"
                              : "Approuver"
                          }
                          onClick={() =>
                            articleInfo.articleIsApproved
                              ? modererArticle(articleInfo._id, false)
                              : modererArticle(articleInfo._id, true)
                          }
                        ></input>
                      </form>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
