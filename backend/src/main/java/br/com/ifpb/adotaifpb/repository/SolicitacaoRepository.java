package br.com.ifpb.adotaifpb.repository;

import br.com.ifpb.adotaifpb.entities.Solicitacao;
import br.com.ifpb.adotaifpb.utils.StatusSolicitacaoEnum;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SolicitacaoRepository extends JpaRepository<Solicitacao, Long> {
    List<Solicitacao> findAllByAnimalIdAndStatus(Long animalId, StatusSolicitacaoEnum status);
    List<Solicitacao> findAllByStatus(StatusSolicitacaoEnum status);
}

