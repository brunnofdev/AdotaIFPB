package br.com.ifpb.adotaifpb.repository;

import br.com.ifpb.adotaifpb.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> buscarPorEmail(String email);
}
