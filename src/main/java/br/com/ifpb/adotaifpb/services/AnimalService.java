package br.com.ifpb.adotaifpb.services;

import br.com.ifpb.adotaifpb.dtos.AnimalRequestDTO;
import br.com.ifpb.adotaifpb.dtos.AnimalResponseDTO;
import br.com.ifpb.adotaifpb.entities.Abrigo;
import br.com.ifpb.adotaifpb.entities.Animal;
import br.com.ifpb.adotaifpb.entities.Especie;
import br.com.ifpb.adotaifpb.repository.AbrigoRepository;
import br.com.ifpb.adotaifpb.repository.AnimalRepository;
import br.com.ifpb.adotaifpb.repository.EspecieRepository;
import br.com.ifpb.adotaifpb.utils.StatusEnum;
import jakarta.transaction.Transactional;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnimalService {

    private final AnimalRepository animalRepository;
    private final EspecieRepository especieRepository;
    private final AbrigoRepository abrigoRepository;

    public AnimalService(AnimalRepository animalRepository, EspecieRepository especieRepository, AbrigoRepository abrigoRepository) {
        this.animalRepository = animalRepository;
        this.especieRepository = especieRepository;
        this.abrigoRepository = abrigoRepository;
    }


    @Transactional
    public AnimalResponseDTO cadastrarAnimal(AnimalRequestDTO dto) {
        // Valida e busca as entidades
        Especie especie = especieRepository.findById(dto.especieId())
                .orElseThrow(() -> new IllegalArgumentException("Espécie não encontrada."));

        Abrigo abrigo = abrigoRepository.findById(dto.abrigoId())
                .orElseThrow(() -> new IllegalArgumentException("Abrigo não encontrado."));

        Animal animal = new Animal();
        animal.setNome(dto.nome());
        animal.setEspecie(especie);
        animal.setAbrigo(abrigo);
        animal.setRaca(dto.raca());
        animal.setIdadeEstimada(dto.idadeEstimada());
        animal.setSexo(dto.sexo());
        animal.setDescricao(dto.descricao());
        animal.setUrlFoto(dto.urlFoto());
        animal.setStatus(StatusEnum.DISPONIVEL);

        animal = animalRepository.save(animal);
        return new AnimalResponseDTO(animal);
    }

    public List<AnimalResponseDTO> listarAnimaisDisponiveis(){
        return animalRepository.findAll().stream()
                .filter(a -> a.getStatus() == StatusEnum.DISPONIVEL)
                .map(AnimalResponseDTO::new)
                .toList();
    }

    public AnimalResponseDTO buscarPorId(Long id) {
        return new AnimalResponseDTO(animalRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Animal não encontrado com o ID: " + id)));
    }

    @Transactional
    public AnimalResponseDTO atualizarAnimal(Long id, AnimalRequestDTO dto) {
        Animal animal = animalRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Animal não encontrado."));

        Especie especie = especieRepository.findById(dto.especieId())
                .orElseThrow(() -> new IllegalArgumentException("Espécie não encontrada."));

        Abrigo abrigo = abrigoRepository.findById(dto.abrigoId())
                .orElseThrow(() -> new IllegalArgumentException("Abrigo não encontrado."));

        animal.setNome(dto.nome());
        animal.setEspecie(especie);
        animal.setAbrigo(abrigo);
        animal.setRaca(dto.raca());
        animal.setIdadeEstimada(dto.idadeEstimada());
        animal.setSexo(dto.sexo());
        animal.setDescricao(dto.descricao());
        animal.setUrlFoto(dto.urlFoto());

        animal = animalRepository.save(animal);
        return new AnimalResponseDTO(animal);
    }

    /* public void removerAnimal(Long id){
        Animal animal = animalRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Animal não encontrado."));
        animalRepository.delete(animal);
    } */
}
