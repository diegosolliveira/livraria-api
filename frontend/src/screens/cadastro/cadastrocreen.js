import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './stylecadastro.css'

export default function Login() {

    const [nome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState("");

    return (

        <div className="login-div">
            <form className='form'>

                <h1>Cadastro</h1>
                <h4 id='login'>Insira os dados para realizar o cadastro.</h4>

                <div className='label-float'>
                    <input type="nome" name="nome" placeholder="Nome" value={nome} onChange={(e) => [setEmail(e.target.value), setError("")]} />
                </div>

                <div className='label-float'>
                    <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => [setEmail(e.target.value), setError("")]} />
                </div>

                <div className='label-float'>
                    <input type="password" name="senha" placeholder="Senha" value={senha} onChange={(e) => [setSenha(e.target.value), setError("")]} />
                </div>

                <div id='login'>{error}</div>

                <div className='actions'>
                    <Link className="buttonVoltar" to={'/'} type='button'>Voltar</Link>
                    <Link className="buttonCriar" to={'/'}>Criar conta</Link>

                </div>
            </form>
        </div>
    );
}