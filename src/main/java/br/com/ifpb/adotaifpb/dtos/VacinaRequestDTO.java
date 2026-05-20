package br.com.ifpb.adotaifpb.dtos;

import jakarta.validation.constraints.NotBlank;

public record VacinaRequestDTO(
        @NotBlank(message = "O nome da vacina é obrigatório.")
        String nome,

        String fabricante
) {}