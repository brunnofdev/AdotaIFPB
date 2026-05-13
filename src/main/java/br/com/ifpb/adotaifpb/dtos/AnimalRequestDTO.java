package br.com.ifpb.adotaifpb.dtos;

import jakarta.validation.constraints.NotBlank;

public record AnimalRequestDTO(
        @NotBlank(message = "O nome é obrigatório")
        String nome,
        @NotBlank(message = "A espécie é obrigatória")
        String especie,
        String raca,
        Integer idadeEstimada,
        Character sexo,
        @NotBlank(message = "A descrição é obrigatória")
        String descricao,
        String urlFoto
) {}