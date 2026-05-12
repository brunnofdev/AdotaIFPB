package br.com.ifpb.adotaifpb.dtos;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UsuarioRequestDTO(

        @NotBlank(message = "Nome nao pode ser vazio ou nulo")
        String nome,

        @NotBlank(message = "Email é obrigatório")
        @Email(message = "O formato do e-mail é inválido")
        String email,

        @NotBlank(message = "O vinculo com o IFPB é obrigatório")
        String vinculoIFPB,

        @Size(min = 10, max = 15, message = "O telefone deve ter entre 10 e 15 digitos")
        String telefone
) { }
