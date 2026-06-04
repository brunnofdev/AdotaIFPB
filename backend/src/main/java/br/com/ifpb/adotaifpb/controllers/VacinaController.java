package br.com.ifpb.adotaifpb.controllers;

import br.com.ifpb.adotaifpb.dtos.VacinaRequestDTO;
import br.com.ifpb.adotaifpb.dtos.VacinaResponseDTO;
import br.com.ifpb.adotaifpb.services.VacinaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/vacinas")
public class VacinaController {

    private final VacinaService vacinaService;

    public VacinaController(VacinaService vacinaService) {
        this.vacinaService = vacinaService;
    }

    @PostMapping
    public ResponseEntity<VacinaResponseDTO> criar(@Valid @RequestBody VacinaRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(vacinaService.salvar(dto));
    }

    @GetMapping
    public ResponseEntity<List<VacinaResponseDTO>> listar() {
        return ResponseEntity.ok(vacinaService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<VacinaResponseDTO> buscar(@PathVariable Long id) {
        return ResponseEntity.ok(vacinaService.buscarPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<VacinaResponseDTO> atualizar(@PathVariable Long id, @Valid @RequestBody VacinaRequestDTO dto) {
        return ResponseEntity.ok(vacinaService.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> inativar(@PathVariable Long id) {
        vacinaService.inativar(id);
        return ResponseEntity.noContent().build();
    }
}