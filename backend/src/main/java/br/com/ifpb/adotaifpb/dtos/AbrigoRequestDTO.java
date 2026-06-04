package br.com.ifpb.adotaifpb.dtos;

import jakarta.validation.constraints.NotBlank;

public record AbrigoRequestDTO(
        @NotBlank(message = "O nome do abrigo é obrigatório.")
        String nome,

        @NotBlank(message = "A localização do abrigo é obrigatória.")
        String localizacao
) {}
