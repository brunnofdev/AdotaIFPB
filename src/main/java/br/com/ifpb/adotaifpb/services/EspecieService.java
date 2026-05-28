package br.com.ifpb.adotaifpb.services;

import br.com.ifpb.adotaifpb.dtos.EspecieRequestDTO;
import br.com.ifpb.adotaifpb.dtos.EspecieResponseDTO;
import br.com.ifpb.adotaifpb.entities.Especie;
import br.com.ifpb.adotaifpb.repository.EspecieRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EspecieService {

        private final EspecieRepository especieRepository;

        public EspecieService(EspecieRepository especieRepository) {
            this.especieRepository = especieRepository;
        }

        public EspecieResponseDTO salvar(EspecieRequestDTO dto) {
            Especie especie = new Especie();
            especie.setNome(dto.nome());

            especie = especieRepository.save(especie);
            return new EspecieResponseDTO(especie);
        }

        public List<EspecieResponseDTO> listarTodas() {
            return especieRepository.findAll()
                    .stream()
                    .map(EspecieResponseDTO::new)
                    .toList();
        }

        public EspecieResponseDTO buscarPorId(Long id) {
            Especie especie = especieRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Espécie não encontrada."));
            return new EspecieResponseDTO(especie);
        }

        public EspecieResponseDTO atualizar(Long id, EspecieRequestDTO dto) {
            Especie especie = especieRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Espécie não encontrada."));

            especie.setNome(dto.nome());

            especie = especieRepository.save(especie);
            return new EspecieResponseDTO(especie);
        }

    @Transactional
    public void inativar(Long id) {
        Especie especie = especieRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Espécie não encontrada."));

        especie.setAtivo(false);
        especieRepository.save(especie);
    }
}
