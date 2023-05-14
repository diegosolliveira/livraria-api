import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from "../../services/api"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './cadastrarlivro.css'

export default function CadastrarLivro() {

    const [titulo, setTitulo] = useState('');

    const [autor, setAutor] = useState('');
    const [autorErro, setAutorErro] = useState('');

    const [data_publicacao, setData_publicacao] = useState('');

    const [categoria, setCategoria] = useState('');
    const [categoriaErro, setCategoriaErro] = useState('');

    const [livroSalvo, setLivroSalvo] = useState('');
    const [imagem, setImagem] = useState('');

    async function buscarAutorPorNome(nome) {
        try {
            const response = await api.get(`/autor/nome/${nome}`);
            if (response.data.id) {
                return response.data.id;

            } else {
                setAutorErro('Autor não encontrado.');
                alert(autorErro)
                return null;
            }
        } catch (error) {
            console.error(error);
            setAutorErro('Erro ao buscar autor.');
            return null;
        }
    }
    async function buscarCategoriaPorNome(nome) {
        try {
            const response = await api.get(`/categoria/nome/${nome}`);
            if (response.data.id) {
                return response.data.id;
            } else {
                setCategoriaErro('Categoria não encontrada.');
                alert(categoriaErro)
                return null;
            }
        } catch (error) {
            console.error(error);
            setCategoriaErro('Erro ao buscar categoria.');
            return null;
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setAutorErro('');
        setCategoriaErro('');
        // Verifica se o nome e o sobrenome são válidos
        if (!titulo.trim() || !autor.trim() || !data_publicacao.trim() || !categoria.trim()) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        // Busca o ID do autor pelo nome
        const autorId = await buscarAutorPorNome(autor);
        if (!autorId) {
            return;
        }

        // Busca o ID da categoria pelo nome
        const categoriaId = await buscarCategoriaPorNome(categoria);
        if (!categoriaId) {
            return;
        }
        // Cria um objeto com os dados do formulário
        const livro = {
            titulo: titulo,
            autor_id: autorId,
            data_publicacao: data_publicacao,
            categoria_id: categoriaId,
            imagem: imagem
        };

        // Envia os dados do formulário para o backend utilizando a api
        const url = `/livros?autorId=${autorId}&categoriaId=${categoriaId}`

        api.post(url, livro)
            .then(response => {
                console.log(response.data);

                // faça algo com a resposta do servidor, se necessário
                setTitulo('');
                setAutor('');
                setData_publicacao('');
                setCategoria('');
                setImagem('');
                setLivroSalvo(livro.titulo);

                // Adicione a classe .autorSalvo--mostrar após 1 segundo
                setTimeout(() => {
                    document.querySelector('.livroSalvo').classList.add('livroSalvo--mostrar');
                }, 100);

                // Remova a classe .autorSalvo--mostrar após 3 segundos
                setTimeout(() => {
                    document.querySelector('.livroSalvo').classList.remove('livroSalvo--mostrar');
                }, 1200);
            })
            .catch(error => {
                console.log(error);
                // trata o erro, se necessário
            });
    }

    return (

        <div className="cadastrolivro-div">
            <form className='form' onSubmit={handleSubmit}>
                <Link className='fahome' to={'/'}><FontAwesomeIcon icon={faArrowLeft} /></Link>

                <h1 className='nomeCadastrolivro'>Cadastrar Livro</h1>
                <h4 id='login'>Insira os dados para realizar o cadastro do livro.</h4>

                <div className='label-float'>
                    <input type="titulo" name="titulo" placeholder="Título" value={titulo} onChange={e => setTitulo(e.target.value)} />
                </div>

                <div className='label-float'>
                    <input type="autor" name="autor" placeholder="Autor" value={autor} onChange={e => setAutor(e.target.value)} />
                </div>


                <div className='label-float'>
                    <input type="data" name="data_publicacao" placeholder="Data de publicação" value={data_publicacao} onChange={e => setData_publicacao(e.target.value)} />
                </div>

                <div className='label-float'>
                    <input type="categoria" name="categoria" placeholder="Categoria" value={categoria} onChange={e => setCategoria(e.target.value)} />
                </div>

                <div className='label-float'>
                    <input type="imagem" name="imagem" placeholder="Adicionar imagem" value={imagem} onChange={e => setImagem(e.target.value)} />
                </div>

                <div className='actions'>
                    <button className="buttonCriarLivro" onClick={handleSubmit}>Salvar</button>
                </div>

                <div className='livroSalvo'>
                    {livroSalvo && <FontAwesomeIcon icon={faCheckCircle} />}
                </div>
            </form>
        </div>
    );
}