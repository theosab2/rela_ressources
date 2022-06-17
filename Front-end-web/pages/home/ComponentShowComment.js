import Image from "next/image";
import style from "../../styles/Home.module.css";

export default function ComponentShowComment() {
    return (
        <div>
        <div className={style.writeCommentContainer}>
            <input type="text" placeholder="Commentaire" className={style.inputComment}></input>
            <button className={style.buttonComment}>Valider</button>
          </div>
          <div className={style.allCommentContainer}>
            <div>
              <div className={style.commentHeader}>
                <Image src="/Image/comments.png" width={30} height={30}/>
                <p>JeanMichel83</p>
                <button className={style.buttonSendComment}>S'abonner</button>
              </div>
              <div className={style.commentContainer}>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum a dolor eu dui semper tincidunt in ac lorem. Fusce maximus semper ornare. Mauris ac diam eu risus pretium auctor. Donec venenatis ut felis et vulputate. Pellentesque non metus auctor arcu bibendum blandit a et dolor. Donec nec lectus eu justo eleifend laoreet et sagittis justo. Donec vel nunc ac velit scelerisque tincidunt. Nullam vitae leo ac dui semper auctor porta sit amet dui. Nulla eros tortor, rhoncus sed ullamcorper sit amet, viverra in lorem.</p>
              </div>
            </div>
          </div>
        </div>
    );
}