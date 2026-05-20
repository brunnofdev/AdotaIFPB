package br.com.ifpb.adotaifpb.dtos;

import jakarta.validation.constraints.NotBlank;

public record EspecieRequestDTO(
        @NotBlank(message = "O nome da espécie é obrigatório.")
        String nome
) {}
