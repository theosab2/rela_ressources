import Link from 'next/link'
import Image from 'next/image'
import style from '../styles/Navigation.module.css'

export default function Navigation(){
    return(
        <div className={style.navBarContent}>
            <Link href="/home/Home">
            <a> 
            <Image
                src="/../public/Image/logo-gouvernement.jpeg" // Route of the image file
                height={120} // Desired size with correct aspect ratio
                width={120} // Desired size with correct aspect ratio
                alt="Logo gouvernement français"
            />
            </a>
            </Link>
            <Link href="/home/Home">
            <a> Créer un post</a>
            </Link>
            <Link href="/home/Home">
            <a> Ressources enregistrer</a>
            </Link>
            <Link href="/home/Home">
            <a> Parametre</a>
            </Link>
            <Link href="/login/Inscription">
            <a> 
            <Image
                src="/../public/Image/logo-gouvernement.jpeg" // Route of the image file
                height={70} // Desired size with correct aspect ratio
                width={70} // Desired size with correct aspect ratio
                alt="Image profil"
            />
            </a>
            </Link>
        </div>
    )
}