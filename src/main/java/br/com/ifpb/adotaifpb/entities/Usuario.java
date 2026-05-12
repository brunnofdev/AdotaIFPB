package br.com.ifpb.adotaifpb.entities;

import br.com.ifpb.adotaifpb.utils.VinculoEnum;
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

    @Enumerated(EnumType.STRING)
    @Column(name = "vinculo_ifpb" ,nullable = false)
    private VinculoEnum vinculoIFPB;

    @Column(nullable = true, length = 20)
    String telefone;

    @Column(name = "perfil_admin", nullable = false)
    Boolean perfilAdmin = false;

    @OneToMany(mappedBy = "usuario")
    private List<Adocao> adocoes;


}
