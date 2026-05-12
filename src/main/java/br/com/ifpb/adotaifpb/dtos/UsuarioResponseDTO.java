package br.com.ifpb.adotaifpb.dtos;

import br.com.ifpb.adotaifpb.entities.Usuario;
import br.com.ifpb.adotaifpb.utils.VinculoEnum;

public record UsuarioResponseDTO(
        long id,
        String nome,
        String email,
        VinculoEnum vinculoIFPB,
        String telefone
) {
    public UsuarioResponseDTO(Usuario usuario) {
        this(usuario.getId(), usuario.getNome(), usuario.getEmail(), usuario.getVinculoIFPB(), usuario.getTelefone());
    }
}
