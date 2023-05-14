import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from "../../services/api"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './cadastrarcategoria.css'

export default function CadastrarCategoria() {

    const [nome, setNome] = useState('');
    const [categoriaSalvo, setCategoriaSalvo] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();

        // Verifica se o nome e o sobrenome são válidos
        if (!nome.trim()) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Cria um objeto com os dados do formulário
        const categoria = {
            nome: nome
        };

        // Envia os dados do formulário para o backend utilizando a api
        api.post('/categoria', categoria)
            .then(response => {
                console.log(response.data);
                // faça algo com a resposta do servidor, se necessário
                setNome('');
                setCategoriaSalvo(categoria.nome);

                // Adicione a classe .categoriaSalvo--mostrar após 1 segundo
                setTimeout(() => {
                    document.querySelector('.categoriaSalvo').classList.add('categoriaSalvo--mostrar');
                }, 100);

                // Remova a classe .categoriaSalvo--mostrar após 3 segundos
                setTimeout(() => {
                    document.querySelector('.categoriaSalvo').classList.remove('categoriaSalvo--mostrar');
                }, 1200);
            })
            .catch(error => {
                console.log(error);
                // trata o erro, se necessário
            });
    }

    return (

        <div className="cadastrocategoria-div">
            <form className='form' onSubmit={handleSubmit}>
                <Link className='fahome' to={'/'}><FontAwesomeIcon icon={faArrowLeft} /></Link>

                <h1 className='tituloCadastrarAutor'>Cadastrar Categoria</h1>
                <h4 id='login'>Insira os dados para realizar o cadastro da categoria.</h4>

                <div className='label-float'>
                    <input type="nome" name="nome" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                </div>

                <div className='actions'>

                    <button className="buttonCriarAutor" onClick={handleSubmit}>Salvar</button>
                </div>

                <div className='categoriaSalvo'>
                    {categoriaSalvo && <FontAwesomeIcon icon={faCheckCircle} />}
                </div>

            </form>
        </div>
    );
}