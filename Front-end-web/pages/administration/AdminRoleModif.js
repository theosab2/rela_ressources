import style from "../../styles/administration.module.css";
export default function () {
  return (
    <>
      <div className={style.AdminModifRoleContainer}>
        <label>Nom</label>
        <input type="text"></input>
        <label>Prenom</label>
        <input type="text"></input>
        <label>nom utilisateur</label>
        <input type="text"></input>
        <label>Role</label>
        <input type="text"></input>
        <input type="button" value="valider"></input>
      </div>
    </>
  );
}
