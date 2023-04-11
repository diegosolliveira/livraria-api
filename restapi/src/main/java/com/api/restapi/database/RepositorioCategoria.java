package com.api.restapi.database;

import org.springframework.data.jpa.repository.JpaRepository;

import com.api.restapi.entidade.Categoria;

public interface RepositorioCategoria extends JpaRepository<Categoria,Long>{
    
}
