package br.com.ifpb.adotaifpb.dtos;

import br.com.ifpb.adotaifpb.entities.Vacinacao;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record VacinacaoResponseDTO(
        Long id,
        Long animalId,
        VacinaResponseDTO vacina,
        LocalDate dataAplicacao,
        LocalDate proximaDose,
        LocalDateTime criadoEm,
        String observacoes
) {
    public VacinacaoResponseDTO(Vacinacao v) {
        this(v.getId(), v.getAnimal() != null ? v.getAnimal().getId() : null, v.getVacina() != null ? new VacinaResponseDTO(v.getVacina()) : null, v.getDataAplicacao(), v.getProximaDose(), v.getCriadoEm(), v.getObservacoes());
    }
}