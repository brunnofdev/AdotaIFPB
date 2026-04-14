package br.com.ifpb.adotaifpb.Entities;


import jakarta.persistence.*;
import lombok.Data;
import org.springframework.context.annotation.Primary;

@Entity
@Data
@Table(name = "tb_animal")
public class Animal {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    @Column(nullable = false)
    String nome;

    @Column(nullable = false)
    String especie;

    @Column(nullable = false)
    String raca;

    @Column(name = "idade_estimada", nullable = false)
    int idadeEstimata;

    @Column(nullable = false)
    char sexo;

    @Column(nullable = false)
    String descricao;

    @Column(name = "url_foto", nullable = false)
    String urlFoto;

    @Column(nullable = false)
    String status;

    @OneToOne(mappedBy = "animal")
    private Adocao adocao;



}
