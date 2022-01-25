import style from "../../styles/Home.module.css";
import Image from "next/image";

export default function Post() {
  return (
    <div className={style.ArticleContainer}>
      <div className={style.ArticleSubContainer}>
        <Image
          src={"/../public/Image/photo-banc.jpg"}
          width={600}
          height={380}
          className={style.postImage}
        />
      </div>
      <div className={style.ArticleFooter}>
        <div>
          <Image src={"/../public/Image/up.png"} width={20} height={20} />
          <Image src={"/../public/Image/down.png"} width={20} height={20} />
        </div>
        <div>Je suis le titre de l'article</div>
        <div className={style.profilPostContainer}>
          <Image
            src={"/../public/Image/photo-banc.jpg"}
            width={50}
            height={50}
            className={style.profilPost}
          />
        </div>
      </div>
    </div>
  );
}
