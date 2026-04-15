package br.com.ifpb.adotaifpb.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "tb_usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(nullable = false)
    String nome;

    @Column(nullable = false, unique = true)
    String email;

    @Column(name = "vinculoifpb" ,nullable = false)
    String vinculoIFPB;

    @Column(nullable = true, length = 20)
    String telefone;

    @Column(name = "perfil_admin", nullable = false)
    Boolean perfilAdmin;

    @OneToMany(mappedBy = "usuario")
    private List<Adocao> adocoes;


}
