package br.com.ifpb.adotaifpb.services;

import br.com.ifpb.adotaifpb.dtos.VacinacaoRequestDTO;
import br.com.ifpb.adotaifpb.dtos.VacinacaoResponseDTO;
import br.com.ifpb.adotaifpb.entities.Animal;
import br.com.ifpb.adotaifpb.entities.Vacina;
import br.com.ifpb.adotaifpb.entities.Vacinacao;
import br.com.ifpb.adotaifpb.repository.AnimalRepository;
import br.com.ifpb.adotaifpb.repository.VacinaRepository;
import br.com.ifpb.adotaifpb.repository.VacinacaoRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class VacinacaoService {

    private final VacinacaoRepository vacinacaoRepository;
    private final AnimalRepository animalRepository;
    private final VacinaRepository vacinaRepository;


    public VacinacaoService(VacinacaoRepository vacinacaoRepository, AnimalRepository animalRepository, VacinaRepository vacinaRepository) {
        this.vacinacaoRepository = vacinacaoRepository;
        this.animalRepository = animalRepository;
        this.vacinaRepository = vacinaRepository;
    }

    @Transactional
    public VacinacaoResponseDTO registrar(VacinacaoRequestDTO dto) {

        Animal animal = animalRepository.findById(dto.animalId())
                .orElseThrow(() -> new IllegalArgumentException("Animal não encontrado na base de dados."));

        Vacina vacina = vacinaRepository.findById(dto.vacinaId())
                .orElseThrow(() -> new IllegalArgumentException("Vacina não encontrada na base de dados."));

        Vacinacao vacinacao = new Vacinacao();
        vacinacao.setAnimal(animal);
        vacinacao.setVacina(vacina);
        vacinacao.setDataAplicacao(dto.dataAplicacao());
        vacinacao.setProximaDose(dto.proximaDose());
        vacinacao.setObservacoes(dto.observacoes());

        Vacinacao vacinacaoSalva = vacinacaoRepository.save(vacinacao);

        return new VacinacaoResponseDTO(vacinacaoSalva);
    }
}