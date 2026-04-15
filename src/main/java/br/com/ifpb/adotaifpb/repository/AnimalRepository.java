package br.com.ifpb.adotaifpb.repository;

import br.com.ifpb.adotaifpb.entities.Animal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, Long> {
}
