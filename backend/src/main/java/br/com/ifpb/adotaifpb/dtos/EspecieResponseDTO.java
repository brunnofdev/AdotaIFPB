package br.com.ifpb.adotaifpb.dtos;

import br.com.ifpb.adotaifpb.entities.Especie;

public record EspecieResponseDTO(
        Long id,
        String nome
) {
    public EspecieResponseDTO(Especie especie) {
        this(especie.getId(), especie.getNome());
    }
}
