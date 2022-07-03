import style from "../../styles/Home.module.css";

export default function Message(props) {

    const abonnement = async (array) => {
    await fetch("http://"+process.env.IP+":3001/localhost:3001/messages/all-by-relation/"), {
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
      };
    }

    return (
        <div className={style.convContainer}>
            <div className={style.convSubContainer}>
                <div className={style.MessageContainer}>{props.UserId}</div>
                <div className={style.SendContainer}>
                
                <textarea rows="5"></textarea>
                <button>Envoyer</button>
                </div>
            </div>
        </div>
    );
}