package br.com.ifpb.adotaifpb.dtos;

import jakarta.validation.constraints.NotBlank;

public record AdocaoRequestDTO(

        @NotBlank(message = "O ID do usuário é obrigatório")
        Long usuarioId,

        @NotBlank(message = "O ID do animal é obrigatório")
        Long animalId
) { }
