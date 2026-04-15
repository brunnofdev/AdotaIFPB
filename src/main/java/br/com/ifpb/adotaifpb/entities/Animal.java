package br.com.ifpb.adotaifpb.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "tb_animal")
public class Animal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(nullable = false)
    String nome;

    @Column(nullable = false)
    String especie;

    @Column
    String raca;

    @Column(name = "idade_estimada")
    int idadeEstimada;

    @Column
    char sexo;

    @Column(nullable = false)
    String descricao;

    @Column(name = "url_foto")
    String urlFoto;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    String StatusEnum;

    @OneToOne(mappedBy = "animal")
    private Adocao adocao;

}
