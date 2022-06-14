import { useEffect, useState } from "react";
import style from "../../styles/Home.module.css";


export default function ComponentShowAmis(props) {
    const [txtAbo,setTxtAbo] = useState(null);
    const [nbRelation,setNbRelation] = useState(null);

    const abonnement = async (array) => {
        if(!props.friend.relation_ids.includes(props.userCookie._id)){
        setTextAbonnement(!props.friend.relation_ids.includes(props.userCookie._id))
        array.push(props.userCookie._id)
        console.log(array)
        await fetch("http://localhost:3001/user/" + props.friend._id, {
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
            setTextAbonnement(!props.friend.relation_ids.includes(props.userCookie._id))
            array = array.filter(e => e !== props.userCookie._id);
            console.log(array)
            await fetch("http://localhost:3001/user/" + props.friend._id, {
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


        function setTextAbonnement(bool){
            if(bool){
                setTxtAbo("Désabonnement");
                setNbRelation((props.friend.relation_ids.length)+1);
            }else{
                setNbRelation((props.friend.relation_ids.length)-1);
                setTxtAbo("Abonnement");
            }
        }

        useEffect(function showPost(){
            setTextAbonnement(props.friend.relation_ids.includes(props.userCookie._id));
            setNbRelation(props.friend.relation_ids.length);
        },[]);
        
        return (
            <>
                <div className={style.abonnementContainer} key={props.friend._id}>
                    <div>
                        <img src="/Image/connexion.png"/>
                        <p>{props.friend.username}</p>
                    </div>
                    <div>
                        <img src="/Image/user.png"/>
                        <p>{nbRelation}</p>
                    </div>
                    <img src="/Image/comment.png"/>
                    <button onClick={() => (abonnement(props.friend.relation_ids))}>
                    {txtAbo}
                    </button>
                </div>
            </>
        );
}