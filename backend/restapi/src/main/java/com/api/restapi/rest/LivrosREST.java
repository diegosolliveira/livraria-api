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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.api.restapi.database.RepositorioLivros;
import com.api.restapi.entidade.Livros;
import com.api.restapi.database.RepositorioAutor;
import com.api.restapi.entidade.Autor;
import com.api.restapi.database.RepositorioCategoria;
import com.api.restapi.entidade.Categoria;

@RestController
@RequestMapping(value = "/livros")
public class LivrosREST {
    
    @Autowired
    private RepositorioLivros repositorio;

    @Autowired
    private RepositorioAutor repositorioAutor;

    @Autowired
    private RepositorioCategoria repositorioCategoria;

    @GetMapping(produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    public List<Livros>listar(){
        return repositorio.findAll();
    }

    @PostMapping(produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE},
                 consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    public void salvar(@RequestBody Livros livros, @RequestParam Long autorId, @RequestParam Long categoriaId){
        Autor autor = repositorioAutor.findById(autorId).orElseThrow(() -> new RuntimeException("Autor não encontrado"));
        livros.setAutor(autor);
        Categoria categoria = repositorioCategoria.findById(categoriaId).orElseThrow(() -> new RuntimeException("Categoria não encontrada"));
        livros.setCategoria(categoria);
        repositorio.save(livros);
    }

    @PutMapping(produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE},
                consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    public void alterar(@RequestBody Livros livros){
        if(livros.getIsbn() > 0){
            repositorio.save(livros);
        }
    }

    @DeleteMapping
    public void excluir(@RequestBody Livros livros){
        repositorio.delete(livros);
    }
}
