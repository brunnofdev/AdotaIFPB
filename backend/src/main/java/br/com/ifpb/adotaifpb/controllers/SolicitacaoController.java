package br.com.ifpb.adotaifpb.controllers;

import br.com.ifpb.adotaifpb.dtos.SolicitacaoRequestDTO;
import br.com.ifpb.adotaifpb.dtos.SolicitacaoResponseDTO;
import br.com.ifpb.adotaifpb.entities.Usuario;
import br.com.ifpb.adotaifpb.services.SolicitacaoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/solicitacoes")
public class SolicitacaoController {

    private final SolicitacaoService solicitacaoService;

    public SolicitacaoController(SolicitacaoService solicitacaoService) {
        this.solicitacaoService = solicitacaoService;
    }

    @PostMapping
    public ResponseEntity<SolicitacaoResponseDTO> solicitar(@Valid @RequestBody SolicitacaoRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(solicitacaoService.solicitarAdocao(dto));
    }

    @GetMapping("/user/{id}")
    @PreAuthorize("hasRole('ADMIN') or #id == authentication.principal.id")
    public ResponseEntity<List<SolicitacaoResponseDTO>> buscarPorIdDeUser(@PathVariable Long id) {

        List<SolicitacaoResponseDTO> solicitacoes = solicitacaoService.buscarSolicitacoesPorUsuarioId(id);
        return ResponseEntity.ok(solicitacoes);

    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<SolicitacaoResponseDTO>> listar() {
        return ResponseEntity.ok(solicitacaoService.listarTodas());
    }

    @PostMapping("/{id}/aprovar")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> aprovar(@PathVariable Long id) {
        solicitacaoService.aprovarSolicitacao(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/cancelar")
    public ResponseEntity<Void> cancelar(@PathVariable Long id, Authentication authentication) {

        Usuario usuarioLogado = (Usuario) authentication.getPrincipal();

        solicitacaoService.cancelarSolicitacao(id, usuarioLogado);

        return ResponseEntity.noContent().build();
    }
}