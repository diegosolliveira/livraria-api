package com.api.restapi.rest;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.restapi.database.RepositorioAutor;
import com.api.restapi.entidade.Autor;

@RestController
@RequestMapping(value = "/autor")
public class AutorREST {
    @Autowired
    private RepositorioAutor repositorio;

    @GetMapping(produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    public List<Autor>listar(){
        return repositorio.findAll();
    }

    @PostMapping(produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE},
                 consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    public void salvar(@RequestBody Autor autor){
        repositorio.save(autor);
    }

    @PutMapping(produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE},
                consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    public void alterar(@RequestBody Autor autor){
        if(autor.getId() > 0){
            repositorio.save(autor);
        }
    }

    @DeleteMapping
    public void excluir(@RequestBody Autor autor){
        repositorio.delete(autor);
    }
}
