
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import api from "../../services/api"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTag, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import Logo from "../../images/Logo.png"
import './homescreen.css'

export default function Home() {

    const [livros, setLivros] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [autores, setAutores] = useState([]);
    const [loading, setLoading] = useState(false);
    const [listaExibida, setListaExibida] = useState('livros'); // novo estado
    const [busca, setBusca] = useState('');

    const handleCategoriaChange = (event) => {
        setListaExibida('categorias'); // atualiza a lista exibida
    };

    const handleAutorChange = (event) => {
        setListaExibida('autores'); // atualiza a lista exibida
    };

    const handleLivroChange = (event) => {
        setListaExibida('livros'); // atualiza a lista exibida
    };

    function handleBuscaKeyDown(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            buscarLivros(busca);
        }
    }

    function handleBuscaChange(event) {
        const termo = event.target.value;
        setBusca(termo);
    }

    async function buscarLivros() {
        setLoading(true);
        try {
            const response = await api.get(`/livros`);
            const livrosEncontrados = response.data.filter(livro => {
                const termoBusca = busca.toLowerCase();
                const titulo = livro.titulo.toLowerCase();
                const autor = `${livro.autor.nome} ${livro.autor.sobrenome}`.toLowerCase();
                const categoria = livro.categoria.nome.toLowerCase();
                return titulo.includes(termoBusca) || autor.includes(termoBusca) || categoria.includes(termoBusca);
            });
            setLivros(livrosEncontrados);
            setListaExibida('livros');
        } catch (error) {
            console.log('Erro ao buscar livros:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        api.get('/livros')
            .then(response => {
                console.log(response);
                setLivros(response.data);
            })
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        api.get('/categoria')
            .then(response => {
                setCategorias(response.data);
                console.log(response);
            })
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        api.get('/autor')
            .then(response => {
                setAutores(response.data);
                console.log(response.data);
            })
            .catch(error => console.log(error));
    }, []);

    let lista = []; // nova variável

    if (listaExibida === 'livros') {
        lista = livros;
    } else if (listaExibida === 'categorias') {
        lista = categorias;
    } else if (listaExibida === 'autores') {
        lista = autores;
    }

    return (
        <div className="home-div">
            <div className='formcategoria'>

                <button className='categorias' name='livro' onClick={handleLivroChange}>Livros</button>
                <button className='categorias' name='autor' onClick={handleAutorChange}>Autores</button>
                <button className='categorias' name='categoria' onClick={handleCategoriaChange}>Categoria</button>

            </div>

            <form className='formhome'>
                <img src={Logo} alt="Logo do site" />
                <form className='form' onSubmit={buscarLivros}>
                    <input
                        className='inputhome'
                        type="text"
                        name="busca"
                        placeholder="Buscar livros, autores e mais..."
                        value={busca}
                        onChange={handleBuscaChange}
                        onKeyDown={handleBuscaKeyDown}
                    />
                    {loading ? <span>Carregando...</span> : null}
                </form>

                <div className='actions'>
                    <Link className="buttonVoltarHome" to={'/'} type='button'>Home</Link>
                    <Link className="buttonCriarHome" to={'/cadastro'}>Cadastrar Usuário</Link>
                    <Link className="buttonCadastrarLivro" to={'/cadastrarlivro'}>Cadastrar livro</Link>
                    <Link className="buttonCadastrarAutor" to={'/cadastrarautor'}>Cadastrar autor</Link>
                    <Link className="buttonCadastrarCategoria" to={'/cadastrarcategoria'}>Cadastrar categoria</Link>
                </div>
            </form>

            {listaExibida === 'livros' ? (
                livros.map(livro => (
                    <div className='livro'>
                        <div className='names' key={livro.id}>
                            <img className='image' src={livro.imagem} alt={livro.titulo} />
                            <h2>{livro.titulo}</h2>
                            <h3>{livro.autor.nome} {livro.autor.sobrenome}</h3>
                            <h3>{livro.categoria.nome}</h3>
                            <h3>{livro.data_publicacao}</h3>
                        </div>

                        <Link to={`/editarlivro/${livro.id}`} className="faEdit"><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></Link>

                    </div>
                ))
            ) : listaExibida === 'autores' ? (autores.map(autor => (
                <Link className='autores' to={`/editarautor/${autor.id}`}>
                    <p className='faUser'><FontAwesomeIcon icon={faUser}></FontAwesomeIcon></p>
                    <div className='names' key={autor.id}>
                        <h4>{autor.nome} {autor.sobrenome}</h4>
                    </div>
                </Link>
            ))

            ) : listaExibida === 'categorias' ? (categorias.map(categoria => (
                <Link className='categoriass' to={`/editarcategoria/${categoria.id}`}>
                    <p className='faTag'><FontAwesomeIcon icon={faTag}></FontAwesomeIcon></p>
                    <div className='names' key={categoria.id}>
                        <h4>{categoria.nome}</h4>
                    </div>
                </Link>

            ))) : null}

        </div>
    );
}