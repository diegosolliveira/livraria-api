import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from '../screens/login/loginscreen';
import Cadastro from '../screens/cadastro/cadastroscreen';
import CadastrarLivro from '../screens/cadastrolivro/cadastrarlivroscreen';
import CadastrarAutor from '../screens/cadastroautor/cadastrarautorscreen';
import CadastrarCategoria from '../screens/cadastrocategoria/cadastrarcategoriascreen'
import EditarLivro from '../screens/editarlivro/editarlivroscreen'
import EditarCategoria from '../screens/editarcategoria/editarcategoriascreen'
import EditarAutor from '../screens/editarautor/editarautorscreen'
import Home from '../screens/home/homescreen';

export default function Routess(){

    return(
        <BrowserRouter>
            <Routes>
                <Route exact path="/login" element={<Login/>}/>
                <Route exact path="/cadastro" element={<Cadastro/>}/>
                <Route exact path="/cadastrarlivro" element={<CadastrarLivro/>}/>
                <Route exact path="/cadastrarautor" element={<CadastrarAutor/>}/>
                <Route exact path="/cadastrarcategoria" element={<CadastrarCategoria/>}/>
                <Route exact path="/editarlivro/:id" element={<EditarLivro/>}/>
                <Route exact path="/editarcategoria/:id" element={<EditarCategoria/>}/>
                <Route exact path="/editarautor/:id" element={<EditarAutor/>}/>
                <Route exact path="/" element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    );
}