package com.api.restapi.rest;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.restapi.database.RepositorioAutor;
import com.api.restapi.entidade.Autor;

@CrossOrigin
@RestController
@RequestMapping(value = "/autor")
public class AutorREST {

    @Autowired
    private RepositorioAutor repositorio;

    @GetMapping(produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
    public List<Autor> listar() {
        return repositorio.findAll();
    }

    @GetMapping("/nome/{nome}")
    public Autor buscarPorNome(@PathVariable String nome) {
        List<Autor> autores = repositorio.findByNome(nome);
        if (!autores.isEmpty()) {
            return autores.get(0);
        } else {
            return null;
        }
    }

    @GetMapping("/{id}")
    public Autor buscarPorId(@PathVariable Long id) {
        Optional<Autor> autor = repositorio.findById(id);
        if (autor.isPresent()) {
            return autor.get();
        } else {
            return null;
        }
    }

    @PostMapping(produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE }, consumes = {
            MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
    public void salvar(@RequestBody Autor autor) {
        repositorio.save(autor);
    }

    @PutMapping(produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE }, consumes = {
            MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
    public void alterar(@RequestBody Autor autor) {
        if (autor.getId() > 0) {
            repositorio.save(autor);
        }
    }

    @PutMapping(value = "/{id}", produces = { MediaType.APPLICATION_JSON_VALUE,
                                              MediaType.APPLICATION_XML_VALUE }, consumes = {
                                              MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
                                              
    public ResponseEntity<Autor> alterar(@PathVariable("id") Long id, @Valid @RequestBody Autor autorAtualizado) {
        Optional<Autor> autorExistenteOptional = repositorio.findById(id);
        if (autorExistenteOptional.isPresent()) {
            Autor autorExistente = autorExistenteOptional.get();
            autorExistente.setNome(autorAtualizado.getNome());
            autorExistente.setSobrenome(autorAtualizado.getSobrenome());
            Autor autorAtualizadoSalvo = repositorio.save(autorExistente);
            return ResponseEntity.ok().body(autorAtualizadoSalvo);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping
    public void excluir(@RequestBody Autor autor) {
        repositorio.delete(autor);
    }

    @DeleteMapping("/{id}")
    public void excluirPorId(@PathVariable Long id) {
        repositorio.deleteById(id);
    }
}
