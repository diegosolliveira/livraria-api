import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from "../../services/api"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import './cadastrarautor.css'

export default function CadastrarAutor() {

  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [autorSalvo, setAutorSalvo] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Verifica se o nome e o sobrenome são válidos
    if (!nome.trim() || !sobrenome.trim()) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    // Cria um objeto com os dados do formulário
    const autor = {
      nome: nome,
      sobrenome: sobrenome
    };

    // Envia os dados do formulário para o backend utilizando a api
    api.post('/autor', autor)
      .then(response => {
        console.log(response.data);

        // faça algo com a resposta do servidor, se necessário
        setNome('');
        setSobrenome('');
        setAutorSalvo(autor.nome);
        console.log(autorSalvo)

        // Adicione a classe .autorSalvo--mostrar após 1 segundo
        setTimeout(() => {
          document.querySelector('.autorSalvo').classList.add('autorSalvo--mostrar');
        }, 100);

        // Remova a classe .autorSalvo--mostrar após 3 segundos
        setTimeout(() => {
          document.querySelector('.autorSalvo').classList.remove('autorSalvo--mostrar');
        }, 1200);
      })
      .catch(error => {
        console.log(error);
        // trata o erro, se necessário
      });
  }

  return (

    <div className="cadastrarautor-div">
      <form className='form' onSubmit={handleSubmit}>
        <Link className='fahome' to={'/'}><FontAwesomeIcon icon={faArrowLeft} /></Link>

        <h1 className='tituloCadastrarAutor'>Cadastrar Autor</h1>
        <h4 id='login'>Insira os dados para realizar o cadastro do autor.</h4>

        <div className='label-float'>
          <input type="nome" name="nome" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>

        <div className='label-float'>
          <input type="sobrenome" name="sobrenome" placeholder="Sobrenome" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} />
        </div>

        <div className='actions'>
          <button className="buttonCriarAutor" onClick={handleSubmit}>Salvar</button>
        </div>

        <div className='autorSalvo'>
          {autorSalvo && <FontAwesomeIcon icon={faCheckCircle} />}
        </div>

      </form>
    </div>
  );
}
