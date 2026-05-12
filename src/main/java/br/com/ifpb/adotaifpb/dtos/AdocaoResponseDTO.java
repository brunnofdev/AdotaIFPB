package br.com.ifpb.adotaifpb.dtos;

import br.com.ifpb.adotaifpb.entities.Adocao;
import br.com.ifpb.adotaifpb.entities.Animal;
import br.com.ifpb.adotaifpb.entities.Usuario;

import java.time.LocalDateTime;

public record AdocaoResponseDTO (

    Long id,
    LocalDateTime dataAdocao,
    String nomeUsuario,
    String nomeAnimal

) {
    public AdocaoResponseDTO(Adocao adocao) {
        this(
                adocao.getId(),
                adocao.getDataAdocao(),
                adocao.getUsuario().getNome(),
                adocao.getAnimal().getNome()
        );
    }
}
