package br.com.ifpb.adotaifpb.services;

import br.com.ifpb.adotaifpb.dtos.UsuarioRequestDTO;
import br.com.ifpb.adotaifpb.dtos.UsuarioResponseDTO;
import br.com.ifpb.adotaifpb.entities.Usuario;
import br.com.ifpb.adotaifpb.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Transactional
    public UsuarioResponseDTO cadastrarUsuario(UsuarioRequestDTO usuarioDTO) {
        Optional<Usuario> existente = usuarioRepository.buscarPorEmail(usuarioDTO.email());
        if (existente.isPresent()) {
            throw new IllegalArgumentException("Já existe um usuário cadastrado com este e-mail.");
        }

        Usuario novoUsuario = new Usuario();
        BeanUtils.copyProperties(usuarioDTO, novoUsuario);
        usuarioRepository.save(novoUsuario);

        return new UsuarioResponseDTO(novoUsuario);
    }

    public List<UsuarioResponseDTO> buscarTodos() {
        return usuarioRepository.findAll()
                .stream()
                .map(UsuarioResponseDTO::new)
                .toList(); }

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
}
