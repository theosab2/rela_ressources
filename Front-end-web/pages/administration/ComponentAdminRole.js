import style from "../../styles/administration.module.css";
import Image from "next/dist/client/image";
import { useState, useEffect } from "react";
export default function ComponentAdminRole(props) {

    const [role,setRole] = useState(null);
    const [txtValidated,setTxtValidated] = useState(false);

    const changeRole = async (newRole) => {
      console.log(newRole)
    await fetch("http://"+process.env.IP+"/user/" + props.users._id, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            role: newRole
          },
        }),
    });
    setTxtValidated(newRole)
    }

    const deleteUser = async () => {
      await fetch("http://"+process.env.IP+"/user/delete/" + props.users._id, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
      });
  
      setTxtValidated("Supprimé")
      }

    if(props.users != null){
    return (
        <div>
            <div className={style.adminRoleUserContainer}>
        <div>
        <Image
            src={"/../public/Image/connexion.png"}
            atl={"icon connexion"}
            width={50}
            height={50}
          />
          <p>{props.users.username}</p>
        </div>
        <div>
        <img
            src={"/Image/user.png"}
            className={style.userIcon}
          />
          <p>{props.users.relation_ids.length}</p>
        </div>
        <img
            src={"/Image/comment.png"}
            className={style.userIcon}
          />
          <div>
          </div>
          <img
            src={"/Image/delete.png"}
            className={style.userIconDelete}
            onClick={()=>deleteUser()}
          />
          <div>
          <select
            className={style.categorieSelect}
            defaultValue={props.users.role}
            onChange={(e) => setRole(e.target.value)}
          >
          <option value="User">User</option> 
          <option value="Admin">Admin</option> 
          <option value="Moderateur">Moderateur</option> 
          </select>
          <button onClick={() => changeRole(role)}>Valider</button>
          </div>
        </div>
        {txtValidated ?
          <p className={style.txtValidated}>L'utilisateur est maintenant {txtValidated}</p>
          :
          <p></p>
        }
      </div>

    );
      }else{
        return(
          <>Loading...</>
        )
      }
}