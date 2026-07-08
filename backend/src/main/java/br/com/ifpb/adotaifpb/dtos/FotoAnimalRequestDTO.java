package br.com.ifpb.adotaifpb.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record FotoAnimalRequestDTO(
        @NotNull(message = "O ID do animal é obrigatório")
        Long animalId,

        @NotBlank(message = "A url da foto é obrigatória")
        String url,

        Boolean principal
) {}