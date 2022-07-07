import { useEffect, useState } from "react";
import style from "../../styles/Home.module.css";
import cookieManager from "../utils/cookieManager";
import { useRouter } from "next/router";

export default function ComponentJoinGroupe(props) {
    const router = useRouter();
    const userCookie = cookieManager();
    const [txtAbo,setTxtAbo] = useState(null)
    const [id, setId] = useState(null);

    const joinGroup = async (array) => {
      if(!props.group.user_ids.includes(userCookie._id)){
        setTxtAbo(true)
        array.push(userCookie._id)
        await fetch("http://"+process.env.IP+":3001/relations/" + props.group._id, {
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
        console.log("Array ->",props.group.user_ids)
        console.log("Cookie ->",userCookie._id)
        console.log("Group info ->",props.group._id)
        console.log("URL ->","http://"+process.env.IP+":3001/relation/" + props.group._id)
        await fetch("http://"+process.env.IP+":3001/relations/" + props.group._id, {
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
      if(props.group != null){
      setTxtAbo(props.group.user_ids.includes(userCookie._id));
      }
      if(id != null){
        if (window) { 
          window.sessionStorage.setItem("Page", "EnterGroup" );
          window.sessionStorage.setItem("id", id );
          router.reload(window.location.pathname)
        }
      }
  },[id]);
    
    if(props.group != null ){
    return (
        <div className={style.groupeContainer} >
            <div className={style.groupContainerImage}>
            <img src="/Image/Bateau_2.jpg" className={style.groupeImage}/>
            </div>
            <div className={style.groupContainerIcone}>
                <div className={style.groupContainerInfo}>
                    <div>
                        <img src="/Image/user.png"/>
                        <p>{props.group.user_ids.length}</p>
                    </div>
                    {txtAbo ? <img src="/Image/oeil.png" onClick={()=>setId(props.group._id)}/>: null}
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