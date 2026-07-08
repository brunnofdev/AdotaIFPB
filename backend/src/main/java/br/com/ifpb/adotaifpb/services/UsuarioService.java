package br.com.ifpb.adotaifpb.services;

import br.com.ifpb.adotaifpb.dtos.UsuarioCreateRequestDTO;
import br.com.ifpb.adotaifpb.dtos.UsuarioRequestDTO;
import br.com.ifpb.adotaifpb.dtos.UsuarioResponseDTO;
import br.com.ifpb.adotaifpb.entities.Cargo;
import br.com.ifpb.adotaifpb.entities.Usuario;
import br.com.ifpb.adotaifpb.repository.CargoRepository;
import br.com.ifpb.adotaifpb.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final CargoRepository cargoRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository, CargoRepository cargoRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.cargoRepository = cargoRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public UsuarioResponseDTO cadastrarUsuario(UsuarioCreateRequestDTO usuarioDTO) {
        Optional<Usuario> existente = usuarioRepository.findByEmail(usuarioDTO.email());
        if (existente.isPresent()) {
            throw new IllegalArgumentException("Já existe um usuário cadastrado com este e-mail.");
        }

        Usuario novoUsuario = new Usuario();
        novoUsuario.setNome(usuarioDTO.nome());
        novoUsuario.setEmail(usuarioDTO.email());

        novoUsuario.setSenha(passwordEncoder.encode(usuarioDTO.senha()));

        novoUsuario.setTelefone(usuarioDTO.telefone());
        novoUsuario.setVinculoIFPB(usuarioDTO.vinculoIFPB());

        Cargo cargoPadrao = cargoRepository.findById(1L)
                .orElseThrow(() -> new IllegalArgumentException("Cargo padrão não encontrado no banco de dados."));
        novoUsuario.setCargo(cargoPadrao);

        usuarioRepository.save(novoUsuario);

        return new UsuarioResponseDTO(novoUsuario);
    }

    public List<UsuarioResponseDTO> buscarTodos() {
        return usuarioRepository.findAllByAtivoTrue()
                .stream()
                .map(UsuarioResponseDTO::new)
                .toList();
    }

    public UsuarioResponseDTO buscarPorId(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));
        return new UsuarioResponseDTO(usuario);
    }

    @Transactional
    public UsuarioResponseDTO atualizarUsuario(Long id, UsuarioRequestDTO dto) {
        Usuario usuarioExistente = usuarioRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));

        usuarioExistente.setNome(dto.nome());
        usuarioExistente.setTelefone(dto.telefone());
        usuarioExistente.setVinculoIFPB(dto.vinculoIFPB());

        Usuario usuarioAtualizado = usuarioRepository.save(usuarioExistente);
        return new UsuarioResponseDTO(usuarioAtualizado);
    }

    @Transactional
    public void removerUsuario(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado."));

        usuarioRepository.delete(usuario);
    }
}