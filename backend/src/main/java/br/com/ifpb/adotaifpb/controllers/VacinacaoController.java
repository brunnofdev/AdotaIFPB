package br.com.ifpb.adotaifpb.controllers;

import br.com.ifpb.adotaifpb.dtos.VacinacaoRequestDTO;
import br.com.ifpb.adotaifpb.dtos.VacinacaoResponseDTO;
import br.com.ifpb.adotaifpb.services.VacinacaoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/vacinacoes")
public class VacinacaoController {

    private final VacinacaoService vacinacaoService;

    public VacinacaoController(VacinacaoService vacinacaoService) {
        this.vacinacaoService = vacinacaoService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<VacinacaoResponseDTO> registrarVacinacao(@Valid @RequestBody VacinacaoRequestDTO dto) {
        VacinacaoResponseDTO vacinacaoSalva = vacinacaoService.registrar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(vacinacaoSalva);
    }
}