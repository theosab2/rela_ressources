import Navigation from "../Navigation";
import Head from "next/head";
import style from "../../styles/Inscription.module.css"
import Link from "next/link"; 

export const getStaticProps = async () =>{
    const res = await fetch();
}

export default function Inscription(){

    const submitUser = async (event) =>{
        event.preventDefault();
        alert('Your name is '+event.target.name.value)
    }

    return (
        <>
        <Head>
            <title>Inscrption</title>
        </Head>
        <Navigation/>
        <div className={style.InscriptionContainer}>
            <div className={style.InscriptionSubContainer}>
                <Link href="">
                <a className={style.InscriptionLink}>
                    J'ai déjà compte
                </a>
                </Link>
                <form className={style.FormInscription}>
                <label className={style.LabelInscription}>Pseudonyme :</label>
                <input id="pseudo" name="pseudo" type="text" className={style.InputInscrption} required />                
                <label className={style.LabelInscription}>Adresse mail :</label>
                <input id="mail" name="mail" type="email" className={style.InputInscrption} required />   
                <label className={style.LabelInscription}>Numéro de téléphone :</label>
                <input id="telephone" name="telephone" type="tel" className={style.InputInscrption} required />
                <label className={style.LabelInscription}>Région :</label>
                <input id="region" name="region" type="text" className={style.InputInscrption} required />                     
                <label className={style.LabelInscription}>Mot de passe :</label>
                <input id="mdp" name="mdp" type="password" className={style.InputInscrption} required />                
                <label className={style.LabelInscription}>Confirmer mot de passe :</label>
                <input id="confMdp" name="confMdp" type="password" className={style.InputInscrption} required />
                <div>
                <input id="condition" name="condition" type="checkbox" required className={style.CheckBoxInscription}/>
                <label htmlFor="condition">J'accepte les conditions d'utilisation</label>
                </div>
                <button type="submit" className={style.SubmitInscription} onSubmit={submitUser}>
                    Inscrption
                </button>
            </form>
            </div>
        </div>
        </>
    )
}