package com.api.restapi.entidade;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Usuarios {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, name = "nome", length = 90)
    private String nome;

    @Column(nullable = false, name = "endereco", columnDefinition = "LONGTEXT")
    private String endereco;

    @Column(nullable = false, name = "telefone", length = 20)
    private String telefone;

    @Column(nullable = false, name = "email", length = 45)
    private String email;

    @Column(name = "outros_detalhes", columnDefinition = "LONGTEXT")
    private String outros_detalhes;

    public Usuarios() {
    }

    public Usuarios(Long id, String nome, String endereco, String telefone, String email, String outros_detalhes) {
        this.id = id;
        this.nome = nome;
        this.endereco = endereco;
        this.telefone = telefone;
        this.email = email;
        this.outros_detalhes = outros_detalhes;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getOutros_detalhes() {
        return outros_detalhes;
    }

    public void setOutros_detalhes(String outros_detalhes) {
        this.outros_detalhes = outros_detalhes;
    }

}
