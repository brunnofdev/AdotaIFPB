package br.com.ifpb.adotaifpb.services;

import br.com.ifpb.adotaifpb.dtos.AdocaoRequestDTO;
import br.com.ifpb.adotaifpb.dtos.AdocaoResponseDTO;
import br.com.ifpb.adotaifpb.entities.Adocao;
import br.com.ifpb.adotaifpb.entities.Animal;
import br.com.ifpb.adotaifpb.entities.Usuario;
import br.com.ifpb.adotaifpb.repository.AdocaoRepository;
import br.com.ifpb.adotaifpb.repository.AnimalRepository;
import br.com.ifpb.adotaifpb.repository.UsuarioRepository;
import br.com.ifpb.adotaifpb.utils.StatusEnum;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdocaoService {

    @Autowired
    private AnimalRepository animalRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private AdocaoRepository adocaoRepository;

    @Transactional
    public AdocaoResponseDTO registrarAdocao(AdocaoRequestDTO dto) {

        Usuario usuario = usuarioRepository.findById(dto.usuarioId())
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado com o ID fornecido."));
        Animal animal = animalRepository.findById(dto.animalId())
                .orElseThrow(() -> new IllegalArgumentException("Animal não encontrado com o ID fornecido."));

        if (animal.getStatus() != StatusEnum.Disponivel) {
            throw new IllegalArgumentException("O animal selecionado não está disponível para adoção.");
        }

        animal.setStatus(StatusEnum.Adotado);
        animalRepository.save(animal);

        Adocao adocao = new Adocao();
        adocao.setUsuario(usuario);
        adocao.setAnimal(animal);
        Adocao adocaoSalva = adocaoRepository.save(adocao);
        return new AdocaoResponseDTO(adocaoSalva);
    }

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
}
