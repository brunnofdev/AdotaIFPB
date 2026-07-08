package br.com.ifpb.adotaifpb.controllers;

import br.com.ifpb.adotaifpb.dtos.AdocaoRequestDTO;
import br.com.ifpb.adotaifpb.dtos.AdocaoResponseDTO;
import br.com.ifpb.adotaifpb.services.AdocaoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/adocoes")
public class AdocaoController {

    private final AdocaoService adocaoService;

    public AdocaoController(AdocaoService adocaoService) {
        this.adocaoService = adocaoService;
    }

    @GetMapping
    public ResponseEntity<List<AdocaoResponseDTO>> listarAdocoes() {
        return ResponseEntity.ok(adocaoService.listarAdocoes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdocaoResponseDTO> buscarPorId(@PathVariable Long id) {
            AdocaoResponseDTO adocao = adocaoService.buscarPorId(id);
            return ResponseEntity.ok(adocao);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelarAdocao(@PathVariable Long id) {
        adocaoService.cancelarAdocao(id);
        return ResponseEntity.noContent().build();
    }
}
