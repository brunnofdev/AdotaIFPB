package br.com.ifpb.adotaifpb.services;

import br.com.ifpb.adotaifpb.dtos.AnimalRequestDTO;
import br.com.ifpb.adotaifpb.dtos.AnimalResponseDTO;
import br.com.ifpb.adotaifpb.entities.Abrigo;
import br.com.ifpb.adotaifpb.entities.Animal;
import br.com.ifpb.adotaifpb.entities.FotoAnimal;
import br.com.ifpb.adotaifpb.repository.AbrigoRepository;
import br.com.ifpb.adotaifpb.repository.AnimalRepository;
import br.com.ifpb.adotaifpb.utils.StatusAnimalEnum;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AnimalService {

    private final AnimalRepository animalRepository;
    private final AbrigoRepository abrigoRepository;

    public AnimalService(AnimalRepository animalRepository, AbrigoRepository abrigoRepository) {
        this.animalRepository = animalRepository;
        this.abrigoRepository = abrigoRepository;
    }

    @Transactional
    public AnimalResponseDTO cadastrarAnimal(AnimalRequestDTO dto) {
        Abrigo abrigo = abrigoRepository.findById(dto.abrigoId())
                .orElseThrow(() -> new IllegalArgumentException("Abrigo não encontrado."));

        Animal animal = new Animal();
        converterAnimalDTO(dto, animal, abrigo);
        animal.setStatus(StatusAnimalEnum.DISPONIVEL);


        if (dto.fotosUrls() != null && !dto.fotosUrls().isEmpty()) {
            animal.setUrlFoto(dto.fotosUrls().get(0));

            coverterFotoDTO(dto, animal);
        }

        animal = animalRepository.save(animal);
        return new AnimalResponseDTO(animal);
    }

    private void coverterFotoDTO(AnimalRequestDTO dto, Animal animal) {
        boolean isPrincipal = true;
        for (String url : dto.fotosUrls()) {
            FotoAnimal foto = new FotoAnimal();
            foto.setUrl(url);
            foto.setPrincipal(isPrincipal);
            animal.adicionarFoto(foto);
            isPrincipal = false;
        }
    }

    public List<AnimalResponseDTO> listarAnimaisDisponiveis() {
        return animalRepository.findByAtivoTrue().stream()
                .map(AnimalResponseDTO::new)
                .collect(Collectors.toList());
    }

    public AnimalResponseDTO buscarPorId(Long id) {
        Animal animal = animalRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Animal não encontrado com o ID: " + id));
        return new AnimalResponseDTO(animal);
    }

    @Transactional
    public AnimalResponseDTO atualizarAnimal(Long id, AnimalRequestDTO dto) {
        Animal animal = animalRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Animal não encontrado."));

        Abrigo abrigo = abrigoRepository.findById(dto.abrigoId())
                .orElseThrow(() -> new IllegalArgumentException("Abrigo não encontrado."));

        converterAnimalDTO(dto, animal, abrigo);


        if (dto.fotosUrls() != null) {
            animal.getFotos().clear();
            animal.setUrlFoto(dto.fotosUrls().isEmpty() ? null : dto.fotosUrls().get(0));

            coverterFotoDTO(dto, animal);
        }

        animal = animalRepository.save(animal);
        return new AnimalResponseDTO(animal);
    }

    private void converterAnimalDTO(AnimalRequestDTO dto, Animal animal, Abrigo abrigo) {
        animal.setNome(dto.nome());
        animal.setEspecie(dto.especie());
        animal.setAbrigo(abrigo);
        animal.setRaca(dto.raca());
        animal.setNascimentoEstimado(dto.nascimentoEstimado());
        animal.setSexoAnimal(dto.sexoAnimal());
        animal.setDescricao(dto.descricao());
        animal.setPeso(dto.peso());
        animal.setCastrado(dto.castrado());
    }

    @Transactional
    public void removerAnimal(Long id) {
        Animal animal = animalRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Animal não encontrado."));

        animalRepository.delete(animal);
    }
}