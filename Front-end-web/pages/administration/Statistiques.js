import React, { useEffect,useState } from "react";
import style from "../../styles/administration.module.css";
import articleManager from "../utils/articleManager";
import groupManager from "../utils/groupManager";

export default function() {
    let [allUser,setAllUser] = useState(null);
    let allArticle = articleManager()
    let allGroup = groupManager();

    useEffect(function showPost(){
          if (window) { 
            window.sessionStorage.setItem("Page", "Statistiques" );
          }
          getUser()
          
      },[]);

    const getUser = async () =>
        fetch("http://"+process.env.IP+"/users/all", {
            method: "GET",
            headers: {
            Accept: "application/json",
            },
        })
        .then((res) => res.json())
        .then((data) => {
      setAllUser(data.users.length);
    });

    if(allArticle != null){
    return (
        <div className={style.statistiquesContainer}>
            <div className={style.statistiquesSubContainer}>
                <p>Nombre d'utilisateur dans l'application : {allUser}</p>
                <p>Nombre d'article dans l'application : {allArticle.length}</p>
                
            </div>
        </div>
    );
    }else{
        return(
            <>Loading...</>
        )
    }
}