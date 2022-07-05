import { useEffect, useState } from "react";

export default function ComponentMessage(props) {
    const [user,setUser] = useState("");
    const getUser = async () =>
    fetch(
      "http://"+process.env.IP+":3001/user/" + props.messageInfo.sender_id,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
    });

    useEffect(() => {
        getUser();
      }, []);

    if(user != null){
    return (
        <div>
            {user.username} : {props.messageInfo.body}
        </div>
    );
    }else{
        <></>
    }
}