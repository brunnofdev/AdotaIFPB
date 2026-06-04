package br.com.ifpb.adotaifpb.dtos;

import br.com.ifpb.adotaifpb.entities.Cargo;

public record CargoResponseDTO(Long id, String nome) {
    public CargoResponseDTO(Cargo cargo) {
        this(cargo.getId(), cargo.getNome());
    }
}
