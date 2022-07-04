import { useState, useEffect } from "react";
import style from "../../styles/Home.module.css";
import Image from "next/image";
import cookieManager from "../utils/cookieManager";

export default function ComponentShowOneComment(props) {
    const [userInfo, setUserInfo] = useState(null);
    const userCookie = cookieManager();
    const [txtAbo,setTxtAbo] = useState(null);

    const getUser  = async (id) =>{
        
        await fetch("http://"+process.env.IP+":3001/user/"+id ,{
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setUserInfo(data);
          });
      }

      const abonnement = async (array) => {
        if(!array.includes(userCookie._id)){
            setTextAbonnement()
            array.push(userCookie._id)
            await fetch("http://"+process.env.IP+":3001/user/" + userInfo._id, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user: {
                relation_ids: array
                },
            }),
            });
        }else{
            setTextAbonnement()
            array = array.filter(e => e !== userCookie._id);
            console.log(array)
            await fetch("http://"+process.env.IP+":3001/user/" + userCookie._id, {
              method: "PUT",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                user: {
                  relation_ids: array
                },
              }),
            });
        }
    }

      useEffect(function showPost(){
      getUser(props.comment.creator)
      setTextAbonnement()
      },[]);

    function setTextAbonnement(){
      if(userInfo){
        if(userInfo.relation_ids.includes(userCookie._id)){
            setTxtAbo(false);
        }else{
            setTxtAbo(true);
        }
      }else{
        setTxtAbo(true);
      }
    }

    
    if(userInfo != null){
        
    return (
        <div className={style.commentBlockContainer}>
            <div className={style.commentHeader}>
              { userInfo.username ? 
              <>
                <Image src="/Image/comments.png" width={30} height={30}/>
                <p>{userInfo.username}</p>
                <button className={style.buttonSendComment} onClick={()=>abonnement(userInfo.relation_ids)}>{txtAbo ? "S'abonner" : "Désabonner"}</button>
              </>
                :
              <>
                <p>Cet utilisateur n'existe plus</p>
                
              </>
              }
            </div>
                
            <div className={style.commentContainer}>
                <p>{props.comment.content}</p>
            </div>
      </div>
    );
    }else{
        return <>Loading...</>
    }
}