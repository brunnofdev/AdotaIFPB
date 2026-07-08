package br.com.ifpb.adotaifpb.dtos;

import br.com.ifpb.adotaifpb.entities.Animal;
import br.com.ifpb.adotaifpb.utils.EspecieEnum;
import br.com.ifpb.adotaifpb.utils.SexoAnimalEnum;
import br.com.ifpb.adotaifpb.utils.StatusAnimalEnum;

import java.time.LocalDateTime;
import java.util.List;

public record AnimalResponseDTO(
        Long id,
        String nome,
        EspecieEnum especie,
        AbrigoResponseDTO abrigo,
        String raca,
        String nascimentoEstimado,
        SexoAnimalEnum sexoAnimal,
        String descricao,
        Double peso,
        Boolean castrado,
        List<FotoAnimalResponseDTO> fotos,
        List<VacinacaoResponseDTO> historicoVacinacoes,
        // Caso possua StatusAnimalEnum na entidade, mantenha. Senão, pode remover.
        StatusAnimalEnum status,
        LocalDateTime criadoEm,
        Boolean ativo
) {
    public AnimalResponseDTO(Animal animal) {
        this(
                animal.getId(),
                animal.getNome(),
                animal.getEspecie(),
                new AbrigoResponseDTO(animal.getAbrigo()),
                animal.getRaca(),
                animal.getNascimentoEstimado() != null ? animal.getNascimentoEstimado().toString() : null,
                animal.getSexoAnimal(),
                animal.getDescricao(),
                animal.getPeso(),
                animal.isCastrado(),
                animal.getFotos() != null ? animal.getFotos().stream().map(FotoAnimalResponseDTO::new).toList() : null,
                animal.getHistoricoVacinacoes() != null ? animal.getHistoricoVacinacoes().stream().map(VacinacaoResponseDTO::new).toList() : null,
                animal.getStatus(),
                animal.getCriadoEm(),
                animal.isAtivo()
        );
    }
}