package br.com.ifpb.adotaifpb.entities;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "tb_especie")
public class Especie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String nome;

    @Column(nullable = false)
    private boolean ativo = true;
}