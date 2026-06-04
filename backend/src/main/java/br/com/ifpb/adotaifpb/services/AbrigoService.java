package br.com.ifpb.adotaifpb.services;

import br.com.ifpb.adotaifpb.dtos.AbrigoRequestDTO;
import br.com.ifpb.adotaifpb.dtos.AbrigoResponseDTO;
import br.com.ifpb.adotaifpb.entities.Abrigo;
import br.com.ifpb.adotaifpb.repository.AbrigoRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AbrigoService {

    private final AbrigoRepository abrigoRepository;

    public AbrigoService(AbrigoRepository abrigoRepository) {
        this.abrigoRepository = abrigoRepository;
    }

    public AbrigoResponseDTO salvar(AbrigoRequestDTO dto) {
        Abrigo abrigo = new Abrigo();
        abrigo.setNome(dto.nome());
        abrigo.setLocalizacao(dto.localizacao());

        abrigo = abrigoRepository.save(abrigo);
        return new AbrigoResponseDTO(abrigo);
    }

    public List<AbrigoResponseDTO> listarTodos() {
        return abrigoRepository.findAll()
                .stream()
                .map(AbrigoResponseDTO::new)
                .toList();
    }

    public AbrigoResponseDTO buscarPorId(Long id) {
        Abrigo abrigo = abrigoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Abrigo não encontrado."));
        return new AbrigoResponseDTO(abrigo);
    }

    public AbrigoResponseDTO atualizar(Long id, AbrigoRequestDTO dto) {
        Abrigo abrigo = abrigoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Abrigo não encontrado."));

        abrigo.setNome(dto.nome());
        abrigo.setLocalizacao(dto.localizacao());

        abrigo = abrigoRepository.save(abrigo);
        return new AbrigoResponseDTO(abrigo);
    }

    @Transactional
    public void inativar(Long id) {
        Abrigo abrigo = abrigoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Espécie não encontrada."));

        abrigo.setAtivo(false);
        abrigoRepository.save(abrigo);
    }
}
