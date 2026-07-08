package br.com.ifpb.adotaifpb.dtos;

import br.com.ifpb.adotaifpb.entities.FotoAnimal;

public record FotoAnimalResponseDTO(
        Long id,
        Long animalId,
        String url,
        Boolean principal
) {
    public FotoAnimalResponseDTO(FotoAnimal foto) {
        this(foto.getId(), foto.getAnimal() != null ? foto.getAnimal().getId() : null, foto.getUrl(), foto.isPrincipal());
    }
}