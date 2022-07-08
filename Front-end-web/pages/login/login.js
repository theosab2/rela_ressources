import { setCookies, getCookie } from "cookies-next";
import { useEffect } from "react";

export default async function useLogin(email, password) {
  try {
    let res = await fetch("http://" + process.env.IP + "/auth/login", {
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
    let body = await res.json();
    if (res.status == 200 || res.status == 201) {
      setCookies("token", body.user, 1 * 3600);
      return true;
    } else {
      console.log(res, body)
      return false;
    }
  } catch (e) {
    console.error(e)
    return false;
  }
}

/*await fetch("http://"+process.env.IP+"/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "identifier": email,
        "password": password,
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setCookies("token", res.user, 1 * 3600);;
      })
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
      return "SUCCESS";
    }*/

export const login = useLogin;
