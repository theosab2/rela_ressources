import { setCookies, getCookie } from "cookies-next";

export default async function ComponentConnexion(email,password) {
    let res = await fetch("http://"+process.env.IP+":3001/auth/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: email,
          password: password,
        }),
      });
      res = await res.json();
      console.log(res.status)
      if (res.status != "SUCCESS" || res.user.isActive == false) {
        console.log(res);
        if(res.status == null || res.status != "SUCCESS"){
          return "Mauvais identifiant ou mot de passe";
        }else if(res.user.isActive == false){
          return "Votre compte a été bloqué";
        }
      } else {
        console.log("Connexion");
        console.log(res.user);
        setCookies("token", res.user, 1 * 3600);
        window.sessionStorage.setItem("Page", "Accueil" );
        router.reload(window.location.pathname)
      }

}