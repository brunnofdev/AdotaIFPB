package br.com.ifpb.adotaifpb.entities;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "tb_vacinacao")
public class Vacinacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "animal_id", nullable = false)
    private Animal animal;

    @ManyToOne
    @JoinColumn(name = "vacina_id", nullable = false)
    private Vacina vacina;

    @Column(name = "data_aplicacao", nullable = false)
    private LocalDate dataAplicacao;
}