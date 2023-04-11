package com.api.restapi.entidade;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Livros {
    
    @Id
    @Column(nullable = false)
    private Long isbn;

    @Column(nullable = false, name = "titulo", length = 100)
    private String titulo;

    @Column(nullable = false, name = "data_publicacao", length = 10)
    private String data_publicacao;

    @ManyToOne
	@JoinColumn(name = "autor_id", nullable = false)
	private Autor autor;

    @ManyToOne
	@JoinColumn(name = "categoria_id", nullable = false)
	private Categoria categoria;

    public Livros() {
    }

    public Livros(Long isbn, String titulo, String data_publicacao, Autor autor, Categoria categoria) {
        this.isbn = isbn;
        this.titulo = titulo;
        this.data_publicacao = data_publicacao;
        this.autor = autor;
        this.categoria = categoria;
    }

    public Long getIsbn() {
        return isbn;
    }

    public void setIsbn(Long isbn) {
        this.isbn = isbn;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getData_publicacao() {
        return data_publicacao;
    }

    public void setData_publicacao(String data_publicacao) {
        this.data_publicacao = data_publicacao;
    }

    public Autor getAutor() {
        return autor;
    }

    public void setAutor(Autor autor) {
        this.autor = autor;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

}
