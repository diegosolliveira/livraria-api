import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from '../screens/login/loginscreen';
import Cadastro from '../screens/cadastro/cadastrocreen';
import useAuth from '../context/hooks/useAuth';

const Private = ({Item}) =>{
  const {authenticated} = useAuth();

  return authenticated > false ? <Item/> : <Login/>;
}

export default function Routess(){

    return(
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login/>}/>
                <Route exact path="/cadastro" element={<Cadastro/>}/>
            </Routes>
        </BrowserRouter>
    );
}