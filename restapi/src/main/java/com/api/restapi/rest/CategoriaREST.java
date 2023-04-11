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

import com.api.restapi.database.RepositorioCategoria;
import com.api.restapi.entidade.Categoria;

@RestController
@RequestMapping(value = "/categoria")
public class CategoriaREST {
    @Autowired
    private RepositorioCategoria repositorio;

    @GetMapping(produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    public List<Categoria>listar(){
        return repositorio.findAll();
    }

    @PostMapping(produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE},
                 consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    public void salvar(@RequestBody Categoria categoria){
        repositorio.save(categoria);
    }

    @PutMapping(produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE},
                consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    public void alterar(@RequestBody Categoria categoria){
        if(categoria.getId() > 0){
            repositorio.save(categoria);
        }
    }

    @DeleteMapping
    public void excluir(@RequestBody Categoria categoria){
        repositorio.delete(categoria);
    }
}
