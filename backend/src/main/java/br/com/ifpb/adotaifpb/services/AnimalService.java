package br.com.ifpb.adotaifpb.services;

import br.com.ifpb.adotaifpb.dtos.AnimalRequestDTO;
import br.com.ifpb.adotaifpb.dtos.AnimalResponseDTO;
import br.com.ifpb.adotaifpb.entities.Abrigo;
import br.com.ifpb.adotaifpb.entities.Animal;
import br.com.ifpb.adotaifpb.repository.AbrigoRepository;
import br.com.ifpb.adotaifpb.repository.AnimalRepository;
import br.com.ifpb.adotaifpb.utils.StatusAnimalEnum;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
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
    public AnimalResponseDTO cadastrarAnimal(AnimalRequestDTO dto, MultipartFile arquivoFoto) {
        Abrigo abrigo = abrigoRepository.findById(dto.abrigoId())
                .orElseThrow(() -> new IllegalArgumentException("Abrigo não encontrado."));

        Animal animal = new Animal();
        converterAnimalDTO(dto, animal, abrigo);
        animal.setStatus(StatusAnimalEnum.DISPONIVEL);

        salvarEAtribuirFoto(arquivoFoto, animal);

        animal = animalRepository.save(animal);
        return new AnimalResponseDTO(animal);
    }

    public List<AnimalResponseDTO> listarAnimaisAtivos() {
        return animalRepository.findByAtivoTrue().stream()
                .map(AnimalResponseDTO::new)
                .collect(Collectors.toList());
    }

    public List<AnimalResponseDTO> listarApenasDisponiveis() {
        return animalRepository.findByAtivoTrueAndStatus(StatusAnimalEnum.DISPONIVEL).stream()
                .map(AnimalResponseDTO::new)
                .collect(Collectors.toList());
    }

    public AnimalResponseDTO buscarPorId(Long id) {
        Animal animal = animalRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Animal não encontrado com o ID: " + id));
        return new AnimalResponseDTO(animal);
    }

    @Transactional
    public AnimalResponseDTO atualizarAnimal(Long id, AnimalRequestDTO dto, MultipartFile arquivoFoto) {
        Animal animal = animalRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Animal não encontrado."));

        Abrigo abrigo = abrigoRepository.findById(dto.abrigoId())
                .orElseThrow(() -> new IllegalArgumentException("Abrigo não encontrado."));

        converterAnimalDTO(dto, animal, abrigo);

        if (arquivoFoto != null && !arquivoFoto.isEmpty()) {
            apagarFoto(animal.getUrlFoto());
            salvarEAtribuirFoto(arquivoFoto, animal);
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

    private void salvarEAtribuirFoto(MultipartFile foto, Animal animal) {
        if (foto != null && !foto.isEmpty()) {
            try {
                Path diretorio = Paths.get("uploads");
                if (!Files.exists(diretorio)) {
                    Files.createDirectories(diretorio);
                }

                String nomeArquivo = System.currentTimeMillis() + "_" + foto.getOriginalFilename().replaceAll("\\s+", "_");
                Path caminhoArquivo = diretorio.resolve(nomeArquivo);
                Files.copy(foto.getInputStream(), caminhoArquivo, StandardCopyOption.REPLACE_EXISTING);

                String urlGerada = "http://localhost:8080/uploads/" + nomeArquivo;

                animal.setUrlFoto(urlGerada);

            } catch (IOException e) {
                throw new RuntimeException("Erro ao salvar a imagem do animal", e);
            }
        }
    }
    private void apagarFoto(String urlFoto) {
        if (urlFoto != null && urlFoto.contains("/uploads/")) {
            try {
                String nomeArquivo = urlFoto.substring(urlFoto.lastIndexOf("/") + 1);
                Path caminhoArquivo = Paths.get("uploads").resolve(nomeArquivo);
                Files.deleteIfExists(caminhoArquivo);
            } catch (IOException e) {
                System.err.println("Erro ao apagar a foto antiga: " + e.getMessage());
            }
        }
    }
}