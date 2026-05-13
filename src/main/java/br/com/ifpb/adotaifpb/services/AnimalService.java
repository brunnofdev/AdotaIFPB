package br.com.ifpb.adotaifpb.services;

import br.com.ifpb.adotaifpb.dtos.AnimalRequestDTO;
import br.com.ifpb.adotaifpb.dtos.AnimalResponseDTO;
import br.com.ifpb.adotaifpb.entities.Animal;
import br.com.ifpb.adotaifpb.repository.AnimalRepository;
import br.com.ifpb.adotaifpb.utils.StatusEnum;
import jakarta.transaction.Transactional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnimalService {
    @Autowired
    private AnimalRepository animalRepository;

    @Transactional
    public AnimalResponseDTO cadastrarAnimal(AnimalRequestDTO dto){
        Animal animal = new Animal();
        BeanUtils.copyProperties(dto, animal);
        animal.setStatus(StatusEnum.Disponivel);

        Animal animalSalvo = animalRepository.save(animal);
        return new AnimalResponseDTO(animalSalvo);
    }

    public List<AnimalResponseDTO> listarAnimaisDisponiveis(){
        return animalRepository.findAll().stream()
                .filter(a -> a.getStatus() == StatusEnum.Disponivel)
                .map(AnimalResponseDTO::new)
                .toList();
    }

    public AnimalResponseDTO buscarPorId(Long id) {
        return new AnimalResponseDTO(animalRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Animal não encontrado com o ID: " + id)));
    }

    @Transactional
    public AnimalResponseDTO atualizarAnimal(Long id, AnimalRequestDTO dto) {
        Animal animal = animalRepository
                .findById(id).orElseThrow(() -> new IllegalArgumentException("Animal não encontrado com o ID: " + id));

        animal.setNome(dto.nome());
        animal.setEspecie(dto.especie());
        animal.setRaca(dto.raca());
        animal.setIdadeEstimada(dto.idadeEstimada());
        animal.setSexo(dto.sexo());
        animal.setDescricao(dto.descricao());
        animal.setUrlFoto(dto.urlFoto());

        Animal animalAtualizado = animalRepository.save(animal);
        return new AnimalResponseDTO(animalAtualizado);
    }

    public void removerAnimal(Long id){
        Animal animal = animalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Animal não encontrado"));
        if (animal.getAdocao() != null) {
            throw new RuntimeException("Não é permitido remover um animal com histórico de adoção.");
        }
        animalRepository.delete(animal);
    }
}
