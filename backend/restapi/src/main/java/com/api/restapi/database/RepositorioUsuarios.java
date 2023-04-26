package com.api.restapi.database;

import org.springframework.data.jpa.repository.JpaRepository;

import com.api.restapi.entidade.Usuarios;

public interface RepositorioUsuarios extends JpaRepository<Usuarios,Long>{
    
}
