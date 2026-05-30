package br.com.ifpb.adotaifpb.controllers;

import br.com.ifpb.adotaifpb.dtos.SolicitacaoRequestDTO;
import br.com.ifpb.adotaifpb.dtos.SolicitacaoResponseDTO;
import br.com.ifpb.adotaifpb.services.SolicitacaoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/solicitacoes")
public class SolicitacaoController {

    private final SolicitacaoService solicitacaoService;

    public SolicitacaoController(SolicitacaoService solicitacaoService) {
        this.solicitacaoService = solicitacaoService;
    }

    @PostMapping
    public ResponseEntity<SolicitacaoResponseDTO> solicitar(@Valid @RequestBody SolicitacaoRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(solicitacaoService.solicitarAdocao(dto));
    }

    @GetMapping
    public ResponseEntity<List<SolicitacaoResponseDTO>> listar() {
        return ResponseEntity.ok(solicitacaoService.listarTodas());
    }

    @PostMapping("/{id}/aprovar")
    public ResponseEntity<Void> aprovar(@PathVariable Long id) {
        solicitacaoService.aprovarSolicitacao(id);
        return ResponseEntity.noContent().build();
    }
}