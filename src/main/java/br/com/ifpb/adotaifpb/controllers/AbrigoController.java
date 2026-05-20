package br.com.ifpb.adotaifpb.controllers;

import br.com.ifpb.adotaifpb.dtos.AbrigoRequestDTO;
import br.com.ifpb.adotaifpb.dtos.AbrigoResponseDTO;
import br.com.ifpb.adotaifpb.services.AbrigoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/abrigos")
public class AbrigoController {

    private final AbrigoService abrigoService;

    public AbrigoController(AbrigoService abrigoService) {
        this.abrigoService = abrigoService;
    }

    @PostMapping
    public ResponseEntity<AbrigoResponseDTO> criar(@Valid @RequestBody AbrigoRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(abrigoService.salvar(dto));
    }

    @GetMapping
    public ResponseEntity<List<AbrigoResponseDTO>> listar() {
        return ResponseEntity.ok(abrigoService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AbrigoResponseDTO> buscar(@PathVariable Long id) {
        return ResponseEntity.ok(abrigoService.buscarPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AbrigoResponseDTO> atualizar(@PathVariable Long id, @Valid @RequestBody AbrigoRequestDTO dto) {
        return ResponseEntity.ok(abrigoService.atualizar(id, dto));
    }
}