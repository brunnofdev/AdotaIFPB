package br.com.ifpb.adotaifpb.entities;

import br.com.ifpb.adotaifpb.utils.StatusEnum;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "tb_animal")
public class Animal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(nullable = false)
    String nome;

    @ManyToOne
    @JoinColumn(name = "especie_id", nullable = false)
    private Especie especie;

    @ManyToOne
    @JoinColumn(name = "abrigo_id", nullable = false)
    private Abrigo abrigo;

    @Column(nullable = true)
    private String raca;

    @Column(name = "idade_estimada", nullable = true)
    private Integer idadeEstimada;

    @Column(nullable = true)
    private Character sexo;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String descricao;

    @Column(name = "url_foto", nullable = true)
    private String urlFoto;

    // CascadeType.ALL - se o animal for removido, as suas vacinas também ficam inativas.
    @OneToMany(mappedBy = "animal", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Vacinacao> historicoVacinacoes;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusEnum status;

    @Column(nullable = false)
    private boolean ativo = true;

}
