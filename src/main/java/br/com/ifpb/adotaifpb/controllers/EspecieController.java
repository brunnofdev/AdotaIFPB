package br.com.ifpb.adotaifpb.controllers;

import br.com.ifpb.adotaifpb.dtos.EspecieRequestDTO;
import br.com.ifpb.adotaifpb.dtos.EspecieResponseDTO;
import br.com.ifpb.adotaifpb.services.EspecieService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/especies")
public class EspecieController {

    private final EspecieService especieService;

    public EspecieController(EspecieService especieService) {
        this.especieService = especieService;
    }

    @PostMapping
    public ResponseEntity<EspecieResponseDTO> criar(@Valid @RequestBody EspecieRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(especieService.salvar(dto));
    }

    @GetMapping
    public ResponseEntity<List<EspecieResponseDTO>> listar() {
        return ResponseEntity.ok(especieService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EspecieResponseDTO> buscar(@PathVariable Long id) {
        return ResponseEntity.ok(especieService.buscarPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EspecieResponseDTO> atualizar(@PathVariable Long id, @Valid @RequestBody EspecieRequestDTO dto) {
        return ResponseEntity.ok(especieService.atualizar(id, dto));
    }
}