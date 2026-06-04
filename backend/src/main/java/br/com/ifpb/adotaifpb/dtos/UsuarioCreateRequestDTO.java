package br.com.ifpb.adotaifpb.dtos;


import br.com.ifpb.adotaifpb.utils.VinculoEnum;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record UsuarioCreateRequestDTO (

        @NotBlank(message = "Nome nao pode ser vazio ou nulo")
        String nome,

        @NotBlank(message = "Email é obrigatório")
        @Email(message = "O formato do e-mail é inválido")
        String email,

        @NotBlank(message = "A senha é obrigatória")
        @Size(min = 6, message = "A senha deve ter no mínimo 6 caracteres")
        String senha,

        @NotNull(message = "O vinculo com o IFPB é obrigatório")
        VinculoEnum vinculoIFPB,

        @Size(min = 10, max = 15, message = "O telefone deve ter entre 10 e 15 digitos")
        String telefone
) { }

