import style from "../../styles/Home.module.css";
import {useRef, useState, useEffect} from 'react';
import cookieManager from "../utils/cookieManager";

export default function Message(props) {
    const message = useRef(null);
    let cookie;
    cookie = cookieManager();
    
    const  [allMessageSender,setAllMessageSender] = useState(null);
    const  [allMessageReceiver,setAllMessageReceiver] = useState(null);

    async function getMessageUser () {
      console.log("User -> ",JSON.parse(cookie))
      let res = await fetch("http://"+process.env.IP+":3001/messages/query" ,{
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "sender_id": JSON.parse(cookie)._id,
        }),
      })
      res = await res.json();
      setAllMessageSender(res);
      console.log("AAA ->",res)
    }

    async function getMessageReceiver () {
      
      let res = await fetch("http://"+process.env.IP+":3001/messages/query" ,{
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "sender_id": props.UserId,
        }),
      })
      res = await res.json();
      setAllMessageReceiver(res);
      console.log("BBB ->",res)
    }

    const sendMessage = async () => {
      await fetch("http://"+process.env.IP+":3001/message/create", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "message": {
            "sender_id": userCookie._id,
            "friend_id": props.UserId,
            "body": message.current.value
          },
        }),
      });
    }

    useEffect(function connect(){
          getMessageUser();
          getMessageReceiver();
    },[]);
    return (
        <div className={style.convContainer}>
            <div className={style.convSubContainer}>
                <div className={style.MessageContainer}>{props.UserId}</div>
                <div className={style.SendContainer}>
                <textarea rows="5" ref={message}></textarea>
                <button onClick={()=>sendMessage()}>Envoyer</button>
                </div>
            </div>
        </div>
    );
}