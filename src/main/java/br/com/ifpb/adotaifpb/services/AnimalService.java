package br.com.ifpb.adotaifpb.services;

import br.com.ifpb.adotaifpb.entities.Animal;
import br.com.ifpb.adotaifpb.repository.AnimalRepository;
import br.com.ifpb.adotaifpb.utils.StatusEnum;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnimalService {
    @Autowired
    private AnimalRepository animalRepository;

    @Transactional
    public Animal cadastrarAnimal(Animal animal){
        if (animal.getNome() == null || animal.getNome().isBlank()) {
            throw new IllegalArgumentException("Nome do animal não pode ser vazio.");
        }
        animal.setStatus(StatusEnum.Disponivel);
        return animalRepository.save(animal);
    }

    public List<Animal> listarAnimaisDisponiveis(){
        return animalRepository.findAll().stream()
                .filter(a -> a.getStatus() == StatusEnum.Disponivel).toList();
    }

    public Optional<Animal> buscarPorId(Long id){
        return animalRepository.findById(id);
    }

    @Transactional
    public Animal atualizarAnimal(Long id, Animal animalAtualizado) {
        return animalRepository.findById(id).map(animal -> {
            animal.setNome(animalAtualizado.getNome());
            animal.setEspecie(animalAtualizado.getEspecie());
            animal.setRaca(animalAtualizado.getRaca());
            animal.setIdadeEstimada(animalAtualizado.getIdadeEstimada());
            animal.setSexo(animalAtualizado.getSexo());
            animal.setDescricao(animalAtualizado.getDescricao());
            animal.setUrlFoto(animalAtualizado.getUrlFoto());
            return animalRepository.save(animal);
        }).orElseThrow(() -> new RuntimeException("Animal não encontrado com o ID: " + id));
    }

    public void removerAnimal(Long id){
        Animal animal = animalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Animal não encontrado"));
        if (animal.getAdocao() != null) {
            throw new RuntimeException("Não é permitido remover um animal com histórico de adoção."); // RN02
        }
        animalRepository.delete(animal);
    }
}
