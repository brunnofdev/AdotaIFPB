package br.com.ifpb.adotaifpb.entities;

import br.com.ifpb.adotaifpb.utils.EspecieEnum;
import br.com.ifpb.adotaifpb.utils.SexoAnimalEnum;
import br.com.ifpb.adotaifpb.utils.StatusAnimalEnum;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name = "tb_animal")
@SQLDelete(sql = "UPDATE tb_animal SET ativo = false WHERE id = ?")
public class Animal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(name = "especie", nullable = false)
    private EspecieEnum especie;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "abrigo_id", nullable = false)
    private Abrigo abrigo;

    @Column(length = 100)
    private String raca;

    @Column(name = "nascimento_estimado")
    private YearMonth nascimentoEstimado;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private SexoAnimalEnum sexoAnimal;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String descricao;

    @Column
    private Double peso;

    private boolean castrado;

    @Column(name = "url_foto")
    private String urlFoto;

    @OneToMany(mappedBy = "animal")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private List<Vacinacao> historicoVacinacoes = new ArrayList<>();

    @OneToMany(mappedBy = "animal")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private List<Solicitacao> solicitacoes = new ArrayList<>();

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private StatusAnimalEnum status;

    @CreationTimestamp
    private LocalDateTime criadoEm;

    @Column(nullable = false)
    private boolean ativo = true;


}
