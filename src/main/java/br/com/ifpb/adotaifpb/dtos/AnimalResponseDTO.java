package br.com.ifpb.adotaifpb.dtos;

import br.com.ifpb.adotaifpb.entities.Animal;
import br.com.ifpb.adotaifpb.utils.StatusEnum;

public record AnimalResponseDTO(
        Long id,
        String nome,
        String especie,
        String raca,
        Integer idadeEstimada,
        Character sexo,
        String descricao,
        String urlFoto,
        StatusEnum status
) {
    public AnimalResponseDTO(Animal animal) {
        this(
                animal.getId(),
                animal.getNome(),
                animal.getEspecie(),
                animal.getRaca(),
                animal.getIdadeEstimada(),
                animal.getSexo(),
                animal.getDescricao(),
                animal.getUrlFoto(),
                animal.getStatus()
        );
    }
}