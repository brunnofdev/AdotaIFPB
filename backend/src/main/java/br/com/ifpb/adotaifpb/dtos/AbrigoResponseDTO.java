package br.com.ifpb.adotaifpb.dtos;

import br.com.ifpb.adotaifpb.entities.Abrigo;

public record AbrigoResponseDTO(
        Long id,
        String nome,
        String localizacao
) {
    public AbrigoResponseDTO(Abrigo abrigo) {
        this(abrigo.getId(), abrigo.getNome(), abrigo.getLocalizacao());
    }
}
