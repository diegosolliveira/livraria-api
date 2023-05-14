import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from "../../services/api"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './editarautor.css'

export default function EditarAutor() {
  const { id } = useParams();

  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [autorSalvo2, setAutorSalvo2] = useState('');
  const [autor, setAutor] = useState('');

  useEffect(() => {
    async function carregaAutor() {
      console.log('Chamando carregaAutor()');
      try {
        const response = await api.get(`/autor/${id}`);
        setAutor(response.data);
        setNome(response.data.nome);
        setSobrenome(response.data.sobrenome);
      } catch (error) {
        console.log('Erro ao buscar autor:', error);
      }
    }
    carregaAutor();
  }, [id]);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await api.put(`/autor/${id}`, {
        nome,
        sobrenome
      });

      setAutorSalvo2(response.data);

      setTimeout(() => {
        document.querySelector('.autorSalvo2').classList.add('autorSalvo2--mostrar');
      }, 100);

      // Remova a classe .autorSalvo--mostrar após 3 segundos
      setTimeout(() => {
        document.querySelector('.autorSalvo2').classList.remove('autorSalvo2--mostrar');
      }, 1200);

    } catch (error) {
      console.log(error);
    }
  }

  function deletarAutor(id) {
    api.delete(`/autor/${id}`)
      .then(response => {
        console.log(response);
        window.location.assign('/');
      })
      .catch(error => {
        console.log(error);
        // Faça algo caso ocorra um erro na deleção
      });
  }

  return (

    <div className="editarautor-div">
      <form className='form' onSubmit={handleSubmit}>
        <Link className='fahome' to={'/'}><FontAwesomeIcon icon={faArrowLeft} /></Link>

        <h1 className='tituloEditarAutor'>Editar Autor</h1>
        <h4 id='loginEditarCategoria'>Atualize os dados do autor.</h4>

        <div className='label-float'>
          <input type="nome" name="nome" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>

        <div className='label-float'>
          <input type="sobrenome" name="sobrenome" placeholder="Sobrenome" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} />
        </div>

        <div className='actions'>
          <button className="buttonCriar2" onClick={handleSubmit}>Salvar</button>
        </div>

        <div className='actions'>
          <button className="buttonDeletar2" onClick={() => deletarAutor(autor.id)}>Deletar</button>
        </div>

        <div className='autorSalvo2'>
          {autorSalvo2 && <FontAwesomeIcon icon={faCheckCircle} />}
        </div>

      </form>
    </div>
  );
}
