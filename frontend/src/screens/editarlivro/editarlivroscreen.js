import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from "../../services/api"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './editarlivro.css'

export default function EditarLivro() {
    const { id } = useParams();
    
    const [livro, setLivro] = useState({});
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [data_publicacao, setData_publicacao] = useState('');
    const [categoria, setCategoria] = useState('');
    const [livroEditado, setLivroEditado] = useState('');
    const [imagem, setImagem] = useState('');

    useEffect(() => {
        async function carregaLivro() {
            console.log('Chamando carregaLivro()');
            try {
                const response = await api.get(`/livros/${id}`);
                setLivro(response.data);
                setTitulo(response.data.titulo);
                setAutor(response.data.autor);
                setData_publicacao(response.data.data_publicacao);
                setCategoria(response.data.categoria);
                setImagem(response.data.imagem);
            } catch (error) {
                console.log('Erro ao buscar livro:', error);
            }
        }
        carregaLivro();
    }, [id]);

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await api.put(`/livros/${id}`, {
                titulo,
                autor,
                data_publicacao,
                categoria,
                imagem
            });

            setLivroEditado(response.data);

            setTimeout(() => {
                document.querySelector('.livroEditado').classList.add('livroEditado--mostrar');
            }, 100);

            // Remova a classe .autorSalvo--mostrar após 3 segundos
            setTimeout(() => {
                document.querySelector('.livroEditado').classList.remove('livroEditado--mostrar');
            }, 1200);

        } catch (error) {
            console.log(error);
        }
    }

    function deletarLivro(id) {
        api.delete(`/livros/${id}`)
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
        <div className="editarlivro-div">
            <form className='form' onSubmit={handleSubmit}>
                <Link className='fahome' to={'/'}><FontAwesomeIcon icon={faArrowLeft} /></Link>

                <h1>Editar Livro</h1>
                <h4 id='loginEditarlivro'>Atualize os dados do livro.</h4>

                <div className='label-float'>
                    <input type="titulo" name="titulo" placeholder="Título" value={titulo} onChange={e => setTitulo(e.target.value)} />
                </div>

                <div className='label-float'>
                    <input type="autor" name="autor" placeholder="Autor" value={`${autor.nome} ${autor.sobrenome}`} onChange={e => setAutor(e.target.value)} />
                </div>


                <div className='label-float'>
                    <input type="data" name="data_publicacao" placeholder="Data de publicação" value={data_publicacao} onChange={e => setData_publicacao(e.target.value)} />
                </div>

                <div className='label-float'>
                    <input type="categoria" name="categoria" placeholder="Categoria" value={categoria.nome} onChange={e => setCategoria(e.target.value)} />
                </div>

                <div className='label-float'>
                    <input type="imagem" name="imagem" placeholder="Adicionar imagem" value={imagem} onChange={e => setImagem(e.target.value)} />
                </div>

                <div className='buttons'>
                    <button className="buttonDeletar" onClick={() => deletarLivro(livro.id)}>Deletar</button>
                    <button className="buttonEditarLivro">Salvar</button>
                </div>

                <div className='imageEditar'>
                    <img className='imageEditar' src={livro.imagem} alt={livro.titulo} />
                </div>

                <div className='livroEditado'>
                    {livroEditado && <FontAwesomeIcon icon={faCheckCircle} />}
                </div>
            </form>
        </div>
    );
}
