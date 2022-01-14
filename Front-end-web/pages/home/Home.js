import Navigation from "../Navigation";
import style from "../../styles/Home.module.css"
import Post from "../home/Post"
export default function Home(props){
    return( 
    <>
        <Navigation></Navigation>
        <div className={style.HomeContainer}>
          <div className={style.HomeSubContainer}>
            <Post></Post>
          </div>
        </div>
    </>
    )
}