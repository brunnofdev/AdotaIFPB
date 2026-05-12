package br.com.ifpb.adotaifpb.dtos;

import br.com.ifpb.adotaifpb.entities.Usuario;

public record UsuarioResponseDTO(
        long id,
        String nome,
        String email,
        String vinculoIFPB,
        String telefone
) {
    public UsuarioResponseDTO(Usuario usuario) {
        this(usuario.getId(), usuario.getNome(), usuario.getEmail(), usuario.getVinculoIFPB(), usuario.getTelefone());
    }
}
