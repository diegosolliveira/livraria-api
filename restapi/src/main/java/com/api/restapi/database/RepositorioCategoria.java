package com.api.restapi.database;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.api.restapi.entidade.Categoria;

public interface RepositorioCategoria extends JpaRepository<Categoria,Long>{
    List<Categoria> findByNome(String nome);
}
