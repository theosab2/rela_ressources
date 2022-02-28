import Image from "next/image";

export default function () {
  return (
    <div>
      <input type="text"></input>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prenom</th>
            <th>Détail</th>
            <th>Modérer</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Théo</td>
            <td>Sabri</td>
            <td>
              <Image
                className={style.chowIcon}
                onClick={chowImg}
                src="/../public/Image/eye-solid.svg"
                height="30px"
                width="30px"
              />
            </td>
            <td>
              <button>Modération</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
