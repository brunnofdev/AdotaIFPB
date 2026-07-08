package br.com.ifpb.adotaifpb.dtos;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record SolicitacaoRequestDTO(
        @NotNull(message = "O ID do usuário é obrigatório")
        Long usuarioId,

        @NotNull(message = "O ID do animal é obrigatório")
        Long animalId,

        @Size(max = 1000, message = "A observação deve ter no máximo 1000 caracteres")
        String observacaoUsuario
) {}