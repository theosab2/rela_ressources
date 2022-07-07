import { useEffect, useState } from "react";
import style from "../../styles/Home.module.css";
import cookieManager from "../utils/cookieManager";
import { useRouter } from "next/router";

export default function ComponentJoinGroupe(props) {
    const router = useRouter();
    const userCookie = cookieManager();
    let txtAbo = null;
    const [id, setId] = useState(null);

    const joinGroup = async (array) => {
      if(!props.group.user_ids.includes(userCookie._id)){
        setTxtAbo(true)
        array.push(userCookie._id)
        await fetch("http://"+process.env.IP+"/relation/" + props.group._id, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            relation: {
              "user_ids": array
            },
          }),
        });
      }else{
        setTxtAbo(false)
        array = array.filter(e => e !== userCookie._id);
        await fetch("http://"+process.env.IP+"/relation/" + props.group._id, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            relation: {
              "user_ids": array
            },
          }),
        });
      }
    }

    useEffect(function showPost(){
      if(id != null){
        if (window) { 
          window.sessionStorage.setItem("Page", "EnterGroup" );
          window.sessionStorage.setItem("id", id );
          router.reload(window.location.pathname)
        }
      }
  },[id]);
    
    if(props.group != null && userCookie._id != null){
      txtAbo = props.group.user_ids.includes(userCookie._id);
    return (
        <div className={style.groupeContainer} >
            <div className={style.groupContainerIcone}>
                <div className={style.groupContainerInfo}>
                    <div>
                        <img src="/Image/user.png"/>
                        <p>{props.group.user_ids.length}</p>
                    </div>
                    {txtAbo ? <img src="/Image/oeil.png" onClick={()=>setId(props.group._id)} className={style.eyeHover}/>: null}
                <button onClick={()=>joinGroup(props.group.user_ids)}>
                  {txtAbo ? "Quitter": "Rejoindre"}
                </button>
                </div>
                <div>
                    <div>
                        <p>{props.group.name}</p>
                    </div>
                </div>
            </div>
        </div>
    );
    }else{
      return(
        <>Loading...</>
      );
    }
}