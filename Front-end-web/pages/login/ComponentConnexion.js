import { setCookies, getCookie } from "cookies-next";
  
export default async function ComponentConnexion(email,password) {
  try{
    if(email != null && password != null){
    let res = await fetch("http://"+process.env.IP+"/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "identifier": email,
        "password": password,
      }),
    });
    
    res = await res.json();
    if (res.status != "SUCCESS" || res.user.isActive == false) {
      if(res.status == null || res.status != "SUCCESS"){
        return "Mauvais identifiant ou mot de passe";
      }else if(res.user.isActive == false){
        return "Votre compte a été bloqué";
      }
    } else {
      setCookies("token", res.user, 1 * 3600);
      return "SUCCESS"
    }
  }
  }catch(e){
    console.log(e)
  }
}