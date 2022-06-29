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
        
        await fetch("http://"+process.env.IP+":3001/user/" + props.friend._id, {
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
        setTxtAbo(false)
        array = array.filter(e => e !== props.userCookie._id);
        console.log(array)
        await fetch("http://"+process.env.IP+":3001/user/" + props.friend._id, {
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

    return (
        <div className={style.groupeContainer} key={props.group._id}>
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