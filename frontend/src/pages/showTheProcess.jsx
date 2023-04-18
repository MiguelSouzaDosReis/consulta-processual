import React, { useContext } from "react";
import { Link } from "react-router-dom";
import MyContext from "../context/myContext";

function ShowTheProcess() {
  function formatDate(time) {
    const data = new Date(time);
    const day = data.getUTCDate().toString().padStart(2, "0");
    const month = (data.getUTCMonth() + 1).toString().padStart(2, "0");
    const year = data.getUTCFullYear().toString();
    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
  }

  const { document } = useContext(MyContext);

  return (
    <div>
      <Link className="voltarLink" to="/">
        Voltar
      </Link>
      <div className="container">
        {document.map((element) => (
          <div className="process" key={element._id}>
            <h2>Processo nº : {element.cnj}</h2>
            <p>
              {element.autor} (Autor) x {element.reu} (Réu)
            </p>
            <p>
              {element.tribunal} - {formatDate(element.data)}{" "}
            </p>
            <p>Movimentações:</p>
            <ul>
              {element.movimentacoes.map((movimentacao) => (
                <div key={movimentacao._id}>
                  <li className="moviment">
                    {movimentacao.descricao}: {formatDate(movimentacao.data)}
                  </li>
                </div>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowTheProcess;
