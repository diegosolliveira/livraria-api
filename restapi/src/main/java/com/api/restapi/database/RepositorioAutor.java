package com.api.restapi.database;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.api.restapi.entidade.Autor;

public interface RepositorioAutor extends JpaRepository<Autor,Long>{
    List<Autor> findByNome(String nome);
}
