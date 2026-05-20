package br.com.ifpb.adotaifpb.repository;

import br.com.ifpb.adotaifpb.entities.Abrigo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AbrigoRepository extends JpaRepository<Abrigo, Long> {
}
