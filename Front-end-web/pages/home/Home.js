import Navigation from "../Navigation";
import style from "../../styles/Home.module.css";
import Post from "../home/Post";

export default function Home() {
  return (
    <>
      <Navigation></Navigation>
      <div className={style.HomeContainer}>
        <div className={style.HomeSubContainer}>
          <Post
            articleTitle="je suis un titre"
            articleProfilUrl="/../public/Image/photo-banc.jpg"
          ></Post>
          <Post
            articleTitle="je suis un titre"
            articleProfilUrl="/../public/Image/photo-banc.jpg"
          ></Post>{" "}
          <Post
            articleTitle="je suis un titre"
            articleProfilUrl="/../public/Image/photo-banc.jpg"
          ></Post>{" "}
          <Post
            articleTitle="je suis un titre"
            articleProfilUrl="/../public/Image/photo-banc.jpg"
          ></Post>
        </div>
      </div>
    </>
  );
}
