import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import api from "../../services/api"
import { Link } from 'react-router-dom';
import './stylecadastro.css'

export default function Cadastrar() {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState("");
    const [usuarioSalvo, setUsuarioSalvo] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Verifica se o nome e o sobrenome são válidos
        if (!nome.trim() || !email.trim() || !senha.trim()) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        // Cria um objeto com os dados do formulário
        const autor = {
            nome: nome,
            email: email,
            senha: senha
        };

        // Envia os dados do formulário para o backend utilizando a api
        api.post('/usuarios', autor)
            .then(response => {
                console.log(response.data);

                // faça algo com a resposta do servidor, se necessário
                setNome('');
                setEmail('');
                setSenha('');
                setUsuarioSalvo(autor.nome);
                console.log(usuarioSalvo)

                // Adicione a classe .autorSalvo--mostrar após 1 segundo
                setTimeout(() => {
                    document.querySelector('.usuarioSalvo').classList.add('usuarioSalvo--mostrar');
                }, 100);

                // Remova a classe .autorSalvo--mostrar após 1.2 segundos
                setTimeout(() => {
                    document.querySelector('.usuarioSalvo').classList.remove('usuarioSalvo--mostrar');
                }, 1200);
            })
            .catch(error => {
                console.log(error);
                // trata o erro, se necessário
            });
    }

    return (
        <div className="login-div">
            <form className='form'>
                <Link className='fahome' to={'/'}><FontAwesomeIcon icon={faArrowLeft} /></Link>

                <h1 className='cadastrotitulo'>Cadastro</h1>
                <h4 id='login'>Insira os dados para realizar o cadastro.</h4>

                <div className='label-float'>
                    <input type="nome" name="nome" placeholder="Nome" value={nome} onChange={(e) => [setNome(e.target.value), setError("")]} />
                </div>

                <div className='label-float'>
                    <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => [setEmail(e.target.value), setError("")]} />
                </div>

                <div className='label-float'>
                    <input type="password" name="senha" placeholder="Senha" value={senha} onChange={(e) => [setSenha(e.target.value), setError("")]} />
                </div>

                <div id='login'>{error}</div>

                <div className='actions'>
                    <button className="buttonCriarConta" onClick={handleSubmit}>Criar conta</button>
                </div>

                <div className='usuarioSalvo'>
                    {usuarioSalvo && <FontAwesomeIcon icon={faCheckCircle} />}
                </div>

            </form>
        </div>
    );
}