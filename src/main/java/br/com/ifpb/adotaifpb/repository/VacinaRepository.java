package br.com.ifpb.adotaifpb.repository;

import br.com.ifpb.adotaifpb.entities.Vacina;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VacinaRepository extends JpaRepository<Vacina, Long> {
}