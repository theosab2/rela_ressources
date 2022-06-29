import { useEffect, useState } from "react";

export default function getAllGroup() {
    const [allGroup,setAllGroup] = useState(null)

    const getGroup = async () =>
    await fetch("http://"+process.env.IP+":3001/relations/all", {
        method: "GET",
        headers: {
        Accept: "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
        setAllGroup(data.relations);
    });

    useEffect(() => {
     getGroup();
    }, []);
    console.log(allGroup)
    return allGroup;

}