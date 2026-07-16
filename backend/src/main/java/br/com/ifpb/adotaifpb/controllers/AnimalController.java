package br.com.ifpb.adotaifpb.controllers;

import br.com.ifpb.adotaifpb.dtos.AnimalRequestDTO;
import br.com.ifpb.adotaifpb.dtos.AnimalResponseDTO;
import br.com.ifpb.adotaifpb.services.AnimalService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/animais")
public class AnimalController {

    private final AnimalService animalService;

    public AnimalController(AnimalService animalService) {
        this.animalService = animalService;
    }


    @PostMapping(consumes = org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AnimalResponseDTO> cadastrar(
            @RequestPart("animal") @Valid AnimalRequestDTO dto,
            @RequestPart(value = "foto", required = false) org.springframework.web.multipart.MultipartFile foto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(animalService.cadastrarAnimal(dto, foto));
    }

    @GetMapping
    public ResponseEntity<List<AnimalResponseDTO>> listarDisponiveis() {
        return ResponseEntity.ok(animalService.listarAnimaisAtivos());
    }
    
    @GetMapping("/disponiveis")
    public ResponseEntity<List<AnimalResponseDTO>> listarApenasDisponiveis() {
        return ResponseEntity.ok(animalService.listarApenasDisponiveis());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnimalResponseDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(animalService.buscarPorId(id));
    }

    @PutMapping(value = "/{id}", consumes = org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AnimalResponseDTO> atualizar(
            @PathVariable Long id,
            @RequestPart("animal") @Valid AnimalRequestDTO dto,
            @RequestPart(value = "foto", required = false) org.springframework.web.multipart.MultipartFile foto) {
        return ResponseEntity.ok(animalService.atualizarAnimal(id, dto, foto));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        animalService.removerAnimal(id);
        return ResponseEntity.noContent().build();
    }
}