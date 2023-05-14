package com.api.restapi.database;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.api.restapi.entidade.Livros;

public interface RepositorioLivros extends JpaRepository<Livros,Long>{

    List<Livros> findByTitulo(String titulo);
}
