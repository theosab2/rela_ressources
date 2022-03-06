import style from "../../styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Post(props) {
  return (
    <div className={style.ArticleContainer}>
      <div className={style.ArticleSubContainer}>
        <img
          src="/Image/bateau_2.jpg"
          className={style.ArticleImageContainer}
        />
      </div>
      <div className={style.ArticleFooter}>
        <div>
          <Image src={"/../public/Image/up.png"} width={20} height={20} />
          <Image src={"/../public/Image/down.png"} width={20} height={20} />
          <Image
            src={"/../public/Image/plus-solid.svg"}
            width={20}
            height={20}
          />
        </div>
        <Link href={`../crudPost/${props.userId}`}>{props.articleTitle}</Link>
        {props.articleProfilUrl && (
          <div className={style.profilPostContainer}>
            <Image
              src={props.articleProfilUrl}
              width={50}
              height={50}
              className={style.profilPost}
            />
          </div>
        )}
      </div>
    </div>
  );
}
