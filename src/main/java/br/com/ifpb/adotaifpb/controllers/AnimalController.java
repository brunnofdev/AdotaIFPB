package br.com.ifpb.adotaifpb.controllers;

import br.com.ifpb.adotaifpb.entities.Animal;
import br.com.ifpb.adotaifpb.services.AnimalService;
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
    public ResponseEntity<Animal> cadastrar(@RequestBody Animal animal) {
        Animal novoAnimal = animalService.cadastrarAnimal(animal);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoAnimal);
    }

    @GetMapping
    public ResponseEntity<List<Animal>> listarDisponiveis() {
        List<Animal> disponiveis = animalService.listarAnimaisDisponiveis();
        return ResponseEntity.ok(disponiveis);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Animal> buscarPorId(@PathVariable Long id) {
        return animalService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Animal> atualizar(@PathVariable Long id, @RequestBody Animal animal) {
        return ResponseEntity.ok(animalService.atualizarAnimal(id, animal));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        animalService.removerAnimal(id);
        return ResponseEntity.noContent().build();
    }

}
