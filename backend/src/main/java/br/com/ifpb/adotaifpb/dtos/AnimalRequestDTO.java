package br.com.ifpb.adotaifpb.dtos;

import br.com.ifpb.adotaifpb.utils.EspecieEnum;
import br.com.ifpb.adotaifpb.utils.SexoAnimalEnum;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.YearMonth;
import java.util.List;

public record AnimalRequestDTO(
        @NotBlank(message = "O nome do animal é obrigatório.")
        String nome,

        @NotNull(message = "A espécie é obrigatória.")
        EspecieEnum especie,

        @NotNull(message = "O ID do abrigo é obrigatório.")
        Long abrigoId,

        String raca,

        @JsonFormat(pattern = "yyyy-MM")
        YearMonth nascimentoEstimado,

        @NotNull(message = "O sexo do animal é obrigatório.")
        SexoAnimalEnum sexoAnimal,

        @NotBlank(message = "A descrição é obrigatória.")
        String descricao,

        Double peso,

        Boolean castrado,

        List<String> fotosUrls
) {}