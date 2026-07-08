package br.com.ifpb.adotaifpb.dtos;

import br.com.ifpb.adotaifpb.entities.Vacina;

public record VacinaResponseDTO(
        Long id,
        String nome,
        String fabricante,
        String descricao,
        Boolean ativo
) {
    public VacinaResponseDTO(Vacina vacina) {
        this(vacina.getId(), vacina.getNome(), vacina.getFabricante(), vacina.getDescricao(), vacina.isAtivo());
    }
}
