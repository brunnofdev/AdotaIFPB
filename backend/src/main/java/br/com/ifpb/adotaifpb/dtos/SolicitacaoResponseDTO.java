package br.com.ifpb.adotaifpb.dtos;

import br.com.ifpb.adotaifpb.entities.Solicitacao;
import java.time.LocalDateTime;

public record SolicitacaoResponseDTO(
        Long id,
        String status,
        LocalDateTime dataSolicitacao,
        String observacaoUsuario,

        String nomeAnimal,
        String especieAnimal,
        String racaAnimal,
        String sexoAnimal,
        Double pesoAnimal,
        Boolean castradoAnimal,

        String nomeAdotante,
        String emailAdotante,
        String telefonAdotante
) {
    public SolicitacaoResponseDTO(Solicitacao s) {
        this(
                s.getId(),
                s.getStatus().name(),
                s.getDataSolicitacao(),
                s.getObservacaoUsuario(),

                // Animal
                s.getAnimal().getNome(),
                s.getAnimal().getEspecie().name(),
                s.getAnimal().getRaca(),
                s.getAnimal().getSexoAnimal().name(),
                s.getAnimal().getPeso(),
                s.getAnimal().isCastrado(),

                // Usuário
                s.getUsuario().getNome(),
                s.getUsuario().getEmail(),
                s.getUsuario().getTelefone()
        );
    }
}