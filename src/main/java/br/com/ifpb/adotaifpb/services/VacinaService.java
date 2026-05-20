package br.com.ifpb.adotaifpb.services;

import br.com.ifpb.adotaifpb.dtos.VacinaRequestDTO;
import br.com.ifpb.adotaifpb.dtos.VacinaResponseDTO;
import br.com.ifpb.adotaifpb.entities.Vacina;
import br.com.ifpb.adotaifpb.repository.VacinaRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class VacinaService {

    private final VacinaRepository vacinaRepository;

    public VacinaService(VacinaRepository vacinaRepository) {
        this.vacinaRepository = vacinaRepository;
    }

    public VacinaResponseDTO salvar(VacinaRequestDTO dto) {
        Vacina vacina = new Vacina();
        vacina.setNome(dto.nome());
        vacina.setFabricante(dto.fabricante());

        vacina = vacinaRepository.save(vacina);
        return new VacinaResponseDTO(vacina);
    }

    public List<VacinaResponseDTO> listarTodas() {
        return vacinaRepository.findAll()
                .stream()
                .map(VacinaResponseDTO::new)
                .toList();
    }

    public VacinaResponseDTO buscarPorId(Long id) {
        Vacina vacina = vacinaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Vacina não encontrada."));
        return new VacinaResponseDTO(vacina);
    }

    public VacinaResponseDTO atualizar(Long id, VacinaRequestDTO dto) {
        Vacina vacina = vacinaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Vacina não encontrada."));

        vacina.setNome(dto.nome());
        vacina.setFabricante(dto.fabricante());

        vacina = vacinaRepository.save(vacina);
        return new VacinaResponseDTO(vacina);
    }
}