package br.com.ifpb.adotaifpb.controllers;

import br.com.ifpb.adotaifpb.dtos.AnimalRequestDTO;
import br.com.ifpb.adotaifpb.dtos.AnimalResponseDTO;
import br.com.ifpb.adotaifpb.services.AnimalService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/animais")
public class AnimalController {

    private final AnimalService animalService;

    public AnimalController(AnimalService animalService) {
        this.animalService = animalService;
    }

    @PostMapping
    public ResponseEntity<AnimalResponseDTO> cadastrar(@Valid @RequestBody AnimalRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(animalService.cadastrarAnimal(dto));
    }

    @GetMapping
    public ResponseEntity<List<AnimalResponseDTO>> listarDisponiveis() {
        return ResponseEntity.ok(animalService.listarAnimaisDisponiveis());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnimalResponseDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(animalService.buscarPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AnimalResponseDTO> atualizar(@PathVariable Long id, @Valid @RequestBody AnimalRequestDTO dto) {
        return ResponseEntity.ok(animalService.atualizarAnimal(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        animalService.removerAnimal(id);

        return ResponseEntity.noContent().build();
    }
}
