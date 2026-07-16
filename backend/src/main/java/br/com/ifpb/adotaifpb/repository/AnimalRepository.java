package br.com.ifpb.adotaifpb.repository;

import br.com.ifpb.adotaifpb.entities.Animal;
import br.com.ifpb.adotaifpb.utils.StatusAnimalEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, Long> {

    List<Animal> findByAtivoTrue();

    List<Animal> findByAtivoTrueAndStatus(StatusAnimalEnum status);
}
