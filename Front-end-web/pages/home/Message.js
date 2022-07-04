import style from "../../styles/Home.module.css";
import {useRef} from 'react';
import cookieManager from "../utils/cookieManager";

export default function Message(props) {
    const message = useRef(null);
    const userCookie = cookieManager();

    const getMessage = async () => {
          await fetch("http://"+process.env.IP+":3001/all-by-relation/:relationId/" + props.UserId, {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
          setArticle(data);
      });
    }

    const sendMessage = async () => {
      await fetch("http://"+process.env.IP+":3001/localhost:3001/message/create"), {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: {
            sender_id: userCookie._id,
            friend_id: props.UserId,
            body: message.current.value
          },
        }),
      };
    }

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