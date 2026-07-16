package br.com.ifpb.adotaifpb.repository;

import br.com.ifpb.adotaifpb.entities.Vacinacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VacinacaoRepository extends JpaRepository<Vacinacao, Long> {
}