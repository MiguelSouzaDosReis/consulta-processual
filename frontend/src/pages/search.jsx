import React, { useContext } from 'react';
import MyContext from '../context/myContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'


function Search() {
  const {  searchTerm, setSearchTerm, setDocument } = useContext(MyContext);

  let navigate = useNavigate()


  const handleClick = async () => {
    navigate('/search')
    await axios.get(`http://localhost:3005/search/${searchTerm}`).then((response) => {
      if (response.data.length <= 4){
        setDocument([... response.data])
      } else {
        setDocument([response.data])
      }
    })
  }

  return (
    <div className='box'>
      <h3 className='text'>Busca</h3>
      <p className='text'>Selecione um tribunal para lista os processos ou buscar pelo número unificado</p>
      <div className='searchItens'>

        <select
          type=""
          className='option'
          name=""
          id="Tribunal"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value) }>
        <option value="" selected> Número de Processo</option>
          <option value="TJSP">TJSP</option>
          <option value="TJMG">TJMG</option>
          <option value="TJRS">TJRS</option>
        </select>

        <input
          type="text"
          value={ searchTerm }
          onChange={(event) => setSearchTerm(event.target.value) }
          className='input'
          id="cnj"
        />
        <button className='button' onClick={ handleClick }>Buscar</button>
      </div>
    </div>
  );
}

export default Search;
