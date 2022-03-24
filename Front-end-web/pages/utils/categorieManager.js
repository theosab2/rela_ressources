import { useEffect, useState } from "react";

export default function allCategorie() {
  const [allCategorie, setallCategorie] = useState(null);
  const getCategorie = async () =>
    fetch("http://localhost:3001/categories/all", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setallCategorie(data.categories);
      });

  useEffect(() => {
    getCategorie();
  }, []);
  return allCategorie;
}
