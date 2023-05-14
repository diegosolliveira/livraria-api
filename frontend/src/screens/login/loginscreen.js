import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import './style.css'

export default function Login() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState("");

    return (

        <div className="login-div">
            <form className='form'>
                <Link className='fahome' to={'/'}><FontAwesomeIcon icon={faArrowLeft} /></Link>

                <h1 className='logintitulo'>Login</h1>
                <h4 id='login'>Bem-vindo! Por favor, insira seus dados.</h4>

                <div className='label-float'>
                    <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => [setEmail(e.target.value), setError("")]} />
                </div>

                <div className='label-float'>
                    <input type="password" name="senha" placeholder="Senha" value={senha} onChange={(e) => [setSenha(e.target.value), setError("")]} />
                </div>

                <div id='login'>{error}</div>

                <div className='acessos'>

                    <input type='checkbox' className="checkbox" placeholder="" />
                    <h1 className='lembrar'>Lembrar-me</h1>

                </div>

                <div className='actions'>
                    <button className="buttonLogar" type='button'>Entrar</button>
                    <Link className="buttonCriar" to={'/cadastro'}>Criar conta</Link>

                </div>
            </form>
        </div>
    );
}