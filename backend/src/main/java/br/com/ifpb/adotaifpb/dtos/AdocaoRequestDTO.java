package br.com.ifpb.adotaifpb.dtos;

import jakarta.validation.constraints.NotNull;

public record AdocaoRequestDTO(

        @NotNull(message = "O ID do usuário é obrigatório")
        Long usuarioId,

        @NotNull(message = "O ID do animal é obrigatório")
        Long animalId
) { }
