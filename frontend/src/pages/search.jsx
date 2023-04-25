import React, { useContext } from "react";
import MyContext from "../context/myContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Search() {
  const { searchTerm, setSearchTerm, setDocument, lawCourt, setLawCourt } =
    useContext(MyContext);

  let navigate = useNavigate();

  const handleClick = async () => {
    navigate("/search");
    await axios
      .get(`http://localhost:3005/search/${searchTerm}`)
      .then((response) => {
        if (response.data.length <= 4) {
          setDocument([...response.data]);
        } else {
          setDocument([response.data]);
        }
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3005/lawsuit")
      .then((response) => {
        console.log(response.data)
        setLawCourt(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  let tribunaisUnicos = [];
  if (lawCourt) {
    tribunaisUnicos = Array.from(new Set(lawCourt.map((element) => element.tribunal))).sort();
  }
  return (
    <div className="box">
      <h3 className="text">Busca</h3>
      <p className="text">
        Selecione um tribunal para lista os processos ou buscar pelo número
        unificado
      </p>
      <div className="searchItens">
        <select
          className="option"
          id="Tribunal"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        >
          <option value="" selected>
            {" "}
            Número de Processo
          </option>
          {
            tribunaisUnicos.map((tribunal) => (
              <option key={tribunal}>{tribunal}</option>
            ))
          }
        </select>

        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="input"
          id="cnj"
        />
        <button className="button" onClick={handleClick}>
          Buscar
        </button>
      </div>
    </div>
  );
}

export default Search;
