import { setCookies, getCookie } from "cookies-next";
import { useEffect} from "react";

export default function useLogin(email,password) {



      const auth = async () => {
        let res = await fetch("http://"+process.env.IP+"/auth/login", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },body: JSON.stringify({
            "identifier": email,
            "password": password,
          }),
        });
        res = await res.json();
        if(res.statusCode == 200|| res.statusCode == 201){
        setCookies("token", res.user, 1 * 3600);
        return true;
        }
        return false;
      };

      return auth();
        

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
}