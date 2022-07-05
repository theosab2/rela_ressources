import style from "../../styles/Home.module.css";
import {useRef, useState, useEffect} from 'react';
import cookieManager from "../utils/cookieManager";
import ComponentMessage from "./ComponentMessage";

export default function Message(props) {
    const message = useRef(null);
    let cookie;
    cookie = cookieManager();
    
    const  [allMessageSender,setAllMessageSender] = useState(null);
    const  [allMessageReceiver,setAllMessageReceiver] = useState(null);

    async function getMessageUser () {
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
            "sender_id": cookie._id,
            "friend_id": props.UserId,
            "body": message.current.value
          },
        }),
      });
    }

    useEffect(function connect(){
      //setInterval(() => {
        getMessageUser();
        getMessageReceiver();
      //}, 3000);
    },[]);

    if( allMessageSender != null && allMessageReceiver != null){
      let concat = allMessageReceiver.messages.concat(allMessageSender.messages)
      console.log("concat",concat)
      console.log("SORT ->",concat.sort((a, b) => Number(a._createdAt) - Number(b._createdAt) ))
      concat.sort((a, b) => Number(a._createdAt) - Number(b._createdAt) )
    return (
        <div className={style.convContainer}>
            <div className={style.convSubContainer}>
                <div className={style.MessageContainer}>{props.UserId}</div>
                {concat && concat.map((message) => (
                  <ComponentMessage key={message._id} messageInfo={message}></ComponentMessage>
                ))}
                <div className={style.SendContainer}>
                <textarea rows="5" ref={message}></textarea>
                <button onClick={()=>sendMessage()}>Envoyer</button>
                </div>
            </div>
        </div>
    );
    }else{
      return (
      <>Loading...</>
      )
    }
}