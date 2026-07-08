package br.com.ifpb.adotaifpb.dtos;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record VacinacaoRequestDTO(
        @NotNull(message = "O ID do animal é obrigatório")
        Long animalId,

        @NotNull(message = "O ID da vacina é obrigatório")
        Long vacinaId,

        @NotNull(message = "A data de aplicação é obrigatória")
        LocalDate dataAplicacao,

        LocalDate proximaDose,

        String observacoes
) {}