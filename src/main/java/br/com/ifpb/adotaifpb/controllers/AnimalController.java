package br.com.ifpb.adotaifpb.controllers;

import br.com.ifpb.adotaifpb.dtos.AnimalRequestDTO;
import br.com.ifpb.adotaifpb.dtos.AnimalResponseDTO;
import br.com.ifpb.adotaifpb.entities.Animal;
import br.com.ifpb.adotaifpb.services.AnimalService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/animais")
public class AnimalController {

    @Autowired
    private AnimalService animalService;

    @PostMapping
    public ResponseEntity<?> cadastrar(@RequestBody AnimalRequestDTO dto) {
        AnimalResponseDTO novoAnimal = animalService.cadastrarAnimal(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoAnimal);
    }

    @GetMapping
    public ResponseEntity<List<AnimalResponseDTO>> listarDisponiveis() {
        List<AnimalResponseDTO> disponiveis = animalService.listarAnimaisDisponiveis();
        return ResponseEntity.ok(disponiveis);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(animalService.buscarPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Long id,@Valid @RequestBody AnimalRequestDTO dto) {
        return ResponseEntity.ok(animalService.atualizarAnimal(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        animalService.removerAnimal(id);
        return ResponseEntity.noContent().build();
    }

}
