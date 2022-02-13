import Navigation from "../Navigation";
import style from "../../styles/crudPost.module.css";
import Image from "next/dist/client/image";
export default function createPost() {
  return (
    <>
      <Navigation></Navigation>
      <div className={style.pageCreate}>
        <div className={style.empty}></div>
        <div className={style.createContainer}>
          <div className={style.Container}>
            <div className={style.ContainerTitle}>
              <Image
                src="/../public/Image/plus-solid.svg"
                height={30}
                width={30}
                alt="plus"
              />
              <input className={style.titleInput} type="text" value=""></input>
            </div>
            <div className={style.ContainerInsert}>
              <input type="file"></input>
            </div>
            <div className={style.ContainerDesc}>
              <textarea
                className={style.descInput}
                rows="5"
                value=""
              ></textarea>
            </div>
          </div>
        </div>
        <div className={style.empty}></div>
      </div>
    </>
  );
}
