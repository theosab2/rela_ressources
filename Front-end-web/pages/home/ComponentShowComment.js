
import style from "../../styles/Home.module.css";
import { useEffect, useState } from "react";
import article from "../../../Back-end/models/article";
import cookieManager from "../utils/cookieManager";
import {useRef} from 'react';
import ComponentShowOneComment from "./ComponentShowOneComment";

export default function ComponentShowComment(props) {

  const [allComment, setAllComment] = useState(null);
  const userCookie = cookieManager();
  const commentContent = useRef(null);
  const [refreshComment, setRefreshComment] = useState(null);
  
      async function getComment (id) {
        let res = await fetch("http://"+process.env.IP+":3001/comments/query" ,{
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: JSON.stringify({
            comment: {
              article: id,
            },
          }),
        })
        res = await res.json();
        setAllComment(res);
      }

      async function postComment (id) {
        let res = await fetch("http://"+process.env.IP+":3001/comment/create" ,{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            comment: {
              creator: userCookie._id,
              "article": props.article._id,
              "content": commentContent.current.value,
            },
          }),
        })
        console.log(JSON.stringify({
          comment: {
            creator: userCookie._id,
            "article": props.article._id,
            "content": commentContent.current.value,
          },
        }))

        res = await res.json();
        setRefreshComment("")
      }

    useEffect(function showPost(){
      getComment(props.article._id)
    },[refreshComment]);

    if(allComment != null){
      console.log(allComment)
    return (
        <div>
        <div className={style.writeCommentContainer}>
            <input type="text" placeholder="Commentaire" className={style.inputComment} ref={commentContent}></input>
            <button className={style.buttonComment} onClick={() => postComment()}>Valider</button>
          </div>
          <div className={style.allCommentContainer}>
            {allComment.comments && allComment.comments.reverse().map((comment) => (
              <ComponentShowOneComment comment={comment}/>
            ))}
          </div>
        </div>
    );
    }else{
      return <>Loading...</>
    }
}