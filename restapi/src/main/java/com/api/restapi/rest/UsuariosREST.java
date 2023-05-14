package com.api.restapi.rest;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.restapi.database.RepositorioUsuarios;
import com.api.restapi.entidade.Usuarios;

@CrossOrigin
@RestController
@RequestMapping(value = "/usuarios")
public class UsuariosREST {
    @Autowired
    private RepositorioUsuarios repositorio;

    @GetMapping(produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    public List<Usuarios>listar(){
        return repositorio.findAll();
    }

    @PostMapping(produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE},
                 consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    public void salvar(@RequestBody Usuarios usuarios){
        repositorio.save(usuarios);
    }

    @PutMapping(produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE},
                consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    public void alterar(@RequestBody Usuarios usuarios){
        if(usuarios.getId() > 0){
            repositorio.save(usuarios);
        }
    }

    @DeleteMapping
    public void excluir(@RequestBody Usuarios usuarios){
        repositorio.delete(usuarios);
    }
}
