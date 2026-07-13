package br.com.ifpb.adotaifpb.services;

import br.com.ifpb.adotaifpb.dtos.AdocaoResponseDTO;
import br.com.ifpb.adotaifpb.entities.Adocao;
import br.com.ifpb.adotaifpb.entities.Animal;
import br.com.ifpb.adotaifpb.repository.AdocaoRepository;
import br.com.ifpb.adotaifpb.repository.AnimalRepository;
import br.com.ifpb.adotaifpb.repository.UsuarioRepository;
import br.com.ifpb.adotaifpb.utils.StatusAnimalEnum;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdocaoService {

    private final AnimalRepository animalRepository;
    private final UsuarioRepository usuarioRepository;
    private final AdocaoRepository adocaoRepository;

    public AdocaoService(AnimalRepository animalRepository, UsuarioRepository usuarioRepository, AdocaoRepository adocaoRepository) {
        this.animalRepository = animalRepository;
        this.usuarioRepository = usuarioRepository;
        this.adocaoRepository = adocaoRepository;
    }

    @Transactional
    public List<AdocaoResponseDTO> listarAdocoes() {
        return adocaoRepository.findAll()
                .stream()
                .map(AdocaoResponseDTO::new)
                .toList();
    }

    public AdocaoResponseDTO buscarPorId(Long id) {
        Adocao adocao =adocaoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Registro de adoção não encontrado com o ID: " + id));
        return new AdocaoResponseDTO(adocao);
    }

    public List<AdocaoResponseDTO> buscarAdocoesPorUsuarioId(Long usuarioId) {

        List<Adocao> adocoes = adocaoRepository.findBySolicitacaoUsuarioId(usuarioId);

        return adocoes.stream()
                .map(AdocaoResponseDTO::new)
                .toList();
    }

    @Transactional
    public void cancelarAdocao(Long id) {
        Adocao adocao = adocaoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Registro de adoção não encontrado."));

        if (!adocao.isAtivo()) {
            throw new IllegalArgumentException("Esta adoção já foi cancelada anteriormente.");
        }

        adocao.setAtivo(false);
        adocaoRepository.save(adocao);

        Animal animal = adocao.getSolicitacao().getAnimal();
        animal.setStatus(StatusAnimalEnum.DISPONIVEL);
        animalRepository.save(animal);
    }
}
