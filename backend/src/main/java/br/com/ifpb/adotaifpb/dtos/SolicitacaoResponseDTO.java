package br.com.ifpb.adotaifpb.dtos;

import br.com.ifpb.adotaifpb.entities.Solicitacao;
import br.com.ifpb.adotaifpb.utils.StatusSolicitacaoEnum;
import java.time.LocalDateTime;

public record SolicitacaoResponseDTO(
        Long id,
        String nomeAdotante,
        String nomeAnimal,
        StatusSolicitacaoEnum status,
        LocalDateTime dataSolicitacao,
        String observacaoUsuario
) {
    public SolicitacaoResponseDTO(Solicitacao s) {
        this(s.getId(), s.getUsuario().getNome(), s.getAnimal().getNome(), s.getStatus(), s.getDataSolicitacao(), s.getObservacaoUsuario());
    }
}