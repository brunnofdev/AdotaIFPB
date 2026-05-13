package br.com.ifpb.adotaifpb.controllers;

import br.com.ifpb.adotaifpb.dtos.AdocaoRequestDTO;
import br.com.ifpb.adotaifpb.dtos.AdocaoResponseDTO;
import br.com.ifpb.adotaifpb.services.AdocaoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/adocoes")
public class AdocaoController {

    @Autowired
    private AdocaoService adocaoService;

    @PostMapping
    public ResponseEntity<?> registrarAdocao(@Valid @RequestBody AdocaoRequestDTO dto) {
            AdocaoResponseDTO novaAdocao = adocaoService.registrarAdocao(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(novaAdocao);
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

}
