import Navigation from "../Navigation"
import style from "../../styles/Inscription.module.css"
import Link from "next/link"

export default function Connexion(){
    return(
        <>
        <Navigation></Navigation>
        <div className={style.InscriptionContainer}>
            <div className={style.InscriptionSubContainer}>
                <Link href="./Connexion">
                <a className={style.InscriptionLink}>
                    Je n'ai pas de compte
                </a>
                </Link>
                
            </div>
        </div>
        </>
    )
}