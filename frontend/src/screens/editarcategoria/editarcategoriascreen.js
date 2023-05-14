import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from "../../services/api"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './editarcategoria.css'

export default function EditarCategoria() {
    const { id } = useParams();

    const [nome, setNome] = useState('');
    const [categoria, setCategoria] = useState('');
    const [categoriaSalvo2, setCategoriaSalvo2] = useState('')

    useEffect(() => {
        async function carregaAutor() {
            console.log('Chamando carregaAutor()');
            try {
                const response = await api.get(`/categoria/${id}`);
                setCategoria(response.data);
                setNome(response.data.nome);
            } catch (error) {
                console.log('Erro ao buscar categoria:', error);
            }
        }
        carregaAutor();
    }, [id]);

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await api.put(`/categoria/${id}`, {
                nome
            });

            setCategoriaSalvo2(response.data);

            setTimeout(() => {
                document.querySelector('.categoriaSalvo2').classList.add('categoriaSalvo2--mostrar');
            }, 100);

            // Remova a classe .autorSalvo--mostrar após 3 segundos
            setTimeout(() => {
                document.querySelector('.categoriaSalvo2').classList.remove('categoriaSalvo2--mostrar');
            }, 1200);

        } catch (error) {
            console.log(error);
        }
    }
    function deletarCategoria(id) {
        api.delete(`/categoria/${id}`)
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

        <div className="editarcategoria-div">
            <form className='form' onSubmit={handleSubmit}>
                <Link className='fahome' to={'/'}><FontAwesomeIcon icon={faArrowLeft} /></Link>

                <h1 className='tituloEditarcategoria'>Editar Categoria</h1>
                <h4 id='loginEditarCategoria'>Autalize os dados da categoria.</h4>

                <div className='label-float'>
                    <input type="nome" name="nome" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                </div>

                <div className='actions'>
                    <button className="buttonEditarcategoria" onClick={handleSubmit}>Salvar</button>
                </div>

                <div className='actions'>
                    <button className="buttonDeletar2" onClick={() => deletarCategoria(categoria.id)}>Deletar</button>
                </div>

                <div className='categoriaSalvo2'>
                    {categoriaSalvo2 && <FontAwesomeIcon icon={faCheckCircle} />}
                </div>

            </form>
        </div>
    );
}