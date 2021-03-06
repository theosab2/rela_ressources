import { useEffect, useState } from "react";

export default function getAllGroup() {
    const [allGroup,setAllGroup] = useState(null)

    const getGroup = async () =>
    await fetch("http://"+process.env.IP+"/relations/all", {
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
    return allGroup;

}