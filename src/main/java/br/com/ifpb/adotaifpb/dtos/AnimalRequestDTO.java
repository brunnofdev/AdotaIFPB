package br.com.ifpb.adotaifpb.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AnimalRequestDTO(
        @NotBlank(message = "O nome do animal é obrigatório.")
        String nome,

        @NotNull(message = "O ID da espécie é obrigatório.")
        Long especieId,

        @NotNull(message = "O ID do abrigo é obrigatório.")
        Long abrigoId,

        String raca,

        Integer idadeEstimada,

        Character sexo,

        @NotBlank(message = "A descrição é obrigatória.")
        String descricao,

        String urlFoto
) {}