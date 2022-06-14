import style from "../../styles/Home.module.css";


export default function ComponentShowAmis(props) {

    const abonnement = async (id) => {
        await fetch("http://localhost:3001/user/" + id, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: {
              username: props.friend.username,
              relation_ids: [id]
            },
          }),
        });
        }

        return (
            <>
                <div className={style.abonnementContainer} key={props.friend._id}>
                    <div>
                        <img src="/Image/connexion.png"/>
                        <p>{props.friend.username}</p>
                    </div>
                    <div>
                        <img src="/Image/user.png"/>
                        <p>{props.friend.relation_ids.length}</p>
                    </div>
                    <img src="/Image/comment.png"/>
                    <button onClick={() => abonnement(props.friend.relation_ids.push(props.userCookie._id))}>
                    { props.friend._id.includes(props.userCookie._id) ? "Désabonnement" : "Abonnement" }
                    </button>
                </div>
            </>
        );
}