package br.com.ifpb.adotaifpb.dtos;

import br.com.ifpb.adotaifpb.entities.Solicitacao;
import java.time.LocalDateTime;

public record SolicitacaoResponseDTO(
        Long id,
        String nomeAdotante,
        String nomeAnimal,
        String status,
        LocalDateTime dataSolicitacao
) {
    public SolicitacaoResponseDTO(Solicitacao s) {
        this(s.getId(), s.getUsuario().getNome(), s.getAnimal().getNome(), s.getStatus().name(), s.getDataSolicitacao());
    }
}