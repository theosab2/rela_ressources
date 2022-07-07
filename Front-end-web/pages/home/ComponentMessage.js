import { useEffect, useState } from "react";

export default function ComponentMessage(props) {
    const [user,setUser] = useState("");
    const getUser = async () =>
    fetch(
      "http://"+process.env.IP+"/user/" + props.messageInfo.sender_id,
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

    if(user != null && props.messageInfo != null){
    return (
        <div>
            <b>{user.username}</b> : {props.messageInfo.body}
        </div>
    );
    }else{
      return(
        <>Loading...</>
      )
    }
}