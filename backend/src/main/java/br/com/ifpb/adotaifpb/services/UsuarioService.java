package br.com.ifpb.adotaifpb.services;

import br.com.ifpb.adotaifpb.dtos.UsuarioCreateRequestDTO;
import br.com.ifpb.adotaifpb.dtos.UsuarioRequestDTO;
import br.com.ifpb.adotaifpb.dtos.UsuarioResponseDTO;
import br.com.ifpb.adotaifpb.entities.Cargo;
import br.com.ifpb.adotaifpb.entities.Usuario;
import br.com.ifpb.adotaifpb.repository.CargoRepository;
import br.com.ifpb.adotaifpb.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;
    private final CargoRepository cargoRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository, CargoRepository cargoRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.cargoRepository = cargoRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public UsuarioResponseDTO cadastrarUsuario(UsuarioCreateRequestDTO dto) {

        // 1. Regra de Negócio: Impedir emails duplicados
        if (usuarioRepository.findByEmail(dto.email()).isPresent()) {
            throw new IllegalArgumentException("Este email já está em uso no sistema.");
        }

        // 2. Transição Limpa: Criar a Entidade a partir do DTO
        Usuario usuario = new Usuario();
        usuario.setNome(dto.nome());
        usuario.setEmail(dto.email());
        usuario.setTelefone(dto.telefone());
        usuario.setVinculoIFPB(dto.vinculoIFPB());

        // 3. Regra de Negócio de Segurança: Encriptar a senha (AQUI É O LUGAR CORRETO!)
        usuario.setSenha(passwordEncoder.encode(dto.senha()));

        // 4. Regra de Negócio: Associar um cargo padrão (Ex: ID 1 = CARGO_USER ou CARGO_ADOTANTE)
        // Se o cargo vier do DTO, você pode trocar '1L' por 'dto.cargoId()'
        Cargo cargo = cargoRepository.findByNome("CARGO_USUARIO")
                .orElseThrow(() -> new IllegalArgumentException("Cargo padrão não encontrado na base de dados."));
        usuario.setCargo(cargo);

        // 5. Persistência
        Usuario usuarioSalvo = usuarioRepository.save(usuario);

        // 6. Retornar o colete à prova de balas (DTO de Resposta sem a senha)
        return new UsuarioResponseDTO(usuarioSalvo);
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


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return usuarioRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado com o email: " + username));
    }
}