import style from "../../styles/Home.module.css";
import Image from "next/image";

export default function Post(props) {
  return (
    <div className={style.ArticleContainer}>
      <div
        className={style.ArticleSubContainer}
        style={{ position: "relative", width: "36vw", height: "45vh" }}
      >
        <Image
          src={"/../public/Image/photo-banc.jpg"}
          layout="fill"
          className={style.postImage}
        />
      </div>
      <div className={style.ArticleFooter}>
        <div>
          <Image src={"/../public/Image/up.png"} width={20} height={20} />
          <Image src={"/../public/Image/down.png"} width={20} height={20} />
        </div>
        <div>{props.articleTitle}</div>
        <div className={style.profilPostContainer}>
          <Image
            src={props.articleProfilUrl}
            width={50}
            height={50}
            className={style.profilPost}
          />
        </div>
      </div>
    </div>
  );
}
