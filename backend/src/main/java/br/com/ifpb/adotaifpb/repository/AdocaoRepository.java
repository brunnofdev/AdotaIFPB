package br.com.ifpb.adotaifpb.repository;

import br.com.ifpb.adotaifpb.entities.Adocao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdocaoRepository extends JpaRepository<Adocao, Long> {
    List<Adocao> findAllByAtivoTrue();
    List<Adocao> findBySolicitacaoUsuarioId(Long usuarioId);
}
