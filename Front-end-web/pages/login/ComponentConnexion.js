import { setCookies, getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useState,useEffect } from "react";

  
export default async function ComponentConnexion(email,password) {
    if(email != null && password != null){
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
    if (res.status != "SUCCESS" || res.user.isActive == false) {
      if(res.status == null || res.status != "SUCCESS"){
        return "Mauvais identifiant ou mot de passe";
      }else if(res.user.isActive == false){
        return "Votre compte a été bloqué";
      }
    } else {
      setCookies("token", res.user, 1 * 3600);
    }
  }
}