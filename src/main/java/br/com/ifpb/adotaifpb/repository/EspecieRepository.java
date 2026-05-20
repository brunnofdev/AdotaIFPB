package br.com.ifpb.adotaifpb.repository;

import br.com.ifpb.adotaifpb.entities.Especie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EspecieRepository extends JpaRepository<Especie, Long> {
}
