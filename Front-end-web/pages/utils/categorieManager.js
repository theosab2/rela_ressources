import { useEffect, useState } from "react";

export default function allCategorie() {
  const [allCategorie, setallCategorie] = useState(null);
  const getCategorie = async () =>
    fetch("http://localhost:3001/ut/all/CATEGORY", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setallCategorie(data.ut);
      });

  useEffect(() => {
    getCategorie();
  }, []);
  if(allCategorie == null){
    console.log(allCategorie)
  }
  else{
    return allCategorie;
  }
}
