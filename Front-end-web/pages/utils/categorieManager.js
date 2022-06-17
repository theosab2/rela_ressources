import { useEffect, useState } from "react";

export default function allCategorie() {
  const [allCategorie, setallCategorie] = useState(null);
  const getCategorie = async () =>
    fetch("http://"+process.env.IP+":3001/uts/all/CATEGORY", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setallCategorie(data.users);
      });

  useEffect(() => {
    getCategorie();
  }, []);
  if(allCategorie == null){
    console.log("null ="+allCategorie)
  }
  else{
    console.log("not null = "+allCategorie)
    return allCategorie;
  }
}
