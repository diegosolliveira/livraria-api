package com.api.restapi.rest;

import java.util.List;
import java.util.Optional;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.restapi.database.RepositorioCategoria;
import com.api.restapi.entidade.Categoria;

@CrossOrigin
@RestController
@RequestMapping(value = "/categoria")
public class CategoriaREST {
    @Autowired
    private RepositorioCategoria repositorio;

    @GetMapping(produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
    public List<Categoria> listar() {
        return repositorio.findAll();
    }

    @GetMapping("/nome/{nome}")
    public Categoria buscarPorNome(@PathVariable String nome) {
        List<Categoria> autores = repositorio.findByNome(nome);
        if (!autores.isEmpty()) {
            return autores.get(0);
        } else {
            return null;
        }
    }

    @GetMapping(value = "/{id}", produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
    public Categoria buscarPorId(@PathVariable Long id) {
        return repositorio.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Categoria não encontrada com o id " + id));
    }

    @PostMapping(produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE }, consumes = {
            MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
    public void salvar(@RequestBody Categoria categoria) {
        repositorio.save(categoria);
    }

    @PutMapping(produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE }, consumes = {
            MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
    public void alterar(@RequestBody Categoria categoria) {
        if (categoria.getId() > 0) {
            repositorio.save(categoria);
        }
    }

    @PutMapping(value = "/{id}", produces = { MediaType.APPLICATION_JSON_VALUE,
                                              MediaType.APPLICATION_XML_VALUE }, consumes = {
                                              MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })

    public ResponseEntity<Categoria> alterar(@PathVariable Long id, @RequestBody Categoria categoriaAtualizada) {
        Optional<Categoria> categoriaExistente = repositorio.findById(id);

        if (categoriaExistente.isPresent()) {
            Categoria categoria = categoriaExistente.get();
            categoria.setNome(categoriaAtualizada.getNome());

            Categoria categoriaAtualizadaSalva = repositorio.save(categoria);
            return ResponseEntity.ok(categoriaAtualizadaSalva);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping
    public void excluir(@RequestBody Categoria categoria) {
        repositorio.delete(categoria);
    }

    @DeleteMapping("/{id}")
    public void excluirPorId(@PathVariable Long id) {
        repositorio.deleteById(id);
    }
}
