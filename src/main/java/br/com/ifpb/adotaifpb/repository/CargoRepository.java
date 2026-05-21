package br.com.ifpb.adotaifpb.repository;

import br.com.ifpb.adotaifpb.entities.Cargo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CargoRepository extends JpaRepository<Cargo, Long> {
    Optional<Cargo> findByNome(Cargo cargo);
}
