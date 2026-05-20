package br.com.ifpb.adotaifpb.dtos;

import br.com.ifpb.adotaifpb.entities.Adocao;

import java.time.LocalDateTime;

public record AdocaoResponseDTO (

        Long idAdocao,
        String nomeAdotante,
        String nomeAnimal,
        LocalDateTime dataAdocao

) {
    public AdocaoResponseDTO(Adocao adocao) {
        this(
                adocao.getId(),
                adocao.getUsuario().getNome(),
                adocao.getAnimal().getNome(),
                adocao.getDataAdocao()
        );
    }
}
