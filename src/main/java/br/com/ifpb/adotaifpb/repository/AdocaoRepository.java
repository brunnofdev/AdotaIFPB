package br.com.ifpb.adotaifpb.repository;

import br.com.ifpb.adotaifpb.entities.Adocao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdocaoRepository extends JpaRepository<Adocao, Long> {
}
