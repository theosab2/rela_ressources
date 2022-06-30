import { useState } from "react";
import style from "../../styles/Home.module.css";
import cookieManager from "../utils/cookieManager";

export default function(props) {

    const userCookie = cookieManager();
    const [txtAbo,setTxtAbo] = useState(null)

    const joinGroup = async (array) => {
        if(!props.group.user_ids.includes(userCookie._id)){
        setTxtAbo(true)
        array.push(props.userCookie._id)
        console.log(array)
        
        await fetch("http://"+process.env.IP+":3001/relations/" + props.group._id, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            relation: {
              user_ids: array
            },
          }),
        });
    }else{
        setTxtAbo(false)
        array = array.filter(e => e !== userCookie._id);
        console.log(array)
        await fetch("http://"+process.env.IP+":3001/relations/" + props.group._id, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            relation: {
              user_ids: array
            },
          }),
        });
        
    }
}

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
                <img src="/Image/oeil.png"/>
                
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
}