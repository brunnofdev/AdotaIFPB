package br.com.ifpb.adotaifpb;

import br.com.ifpb.adotaifpb.entities.Adocao;
import br.com.ifpb.adotaifpb.entities.Animal;
import br.com.ifpb.adotaifpb.entities.Usuario;
import br.com.ifpb.adotaifpb.repository.AdocaoRepository;
import br.com.ifpb.adotaifpb.repository.AnimalRepository;
import br.com.ifpb.adotaifpb.repository.UsuarioRepository;
import br.com.ifpb.adotaifpb.utils.StatusEnum;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class AdotaIfpbApplication {

    public static void main(String[] args) {
        SpringApplication.run(AdotaIfpbApplication.class, args);
    }
    @Bean
    public CommandLineRunner testarCriacao(
            UsuarioRepository usuarioRepo,
            AnimalRepository animalRepo,
            AdocaoRepository adocaoRepo) {

        return args -> {

            Usuario usuario = new Usuario();
            usuario.setNome("Brunno");
            usuario.setEmail("brunno@ifpb.edu.br");
            usuario.setVinculoIFPB("Aluno");
            usuario.setTelefone("83999999999");
            usuario.setPerfilAdmin(true);
            usuarioRepo.save(usuario);

            Animal animal = new Animal();
            animal.setNome("Caramelo");
            animal.setEspecie("Cachorro");
            animal.setRaca("Sem Raça Definida");
            animal.setIdadeEstimada(3);
            animal.setSexo('M');
            animal.setDescricao("Muito dócil e brincalhão");
            animal.setStatus(StatusEnum.Disponivel);
            animalRepo.save(animal);

            Adocao adocao = new Adocao();
            adocao.setUsuario(usuario);
            adocao.setAnimal(animal);


            animal.setStatus(StatusEnum.Adotado);
            animalRepo.save(animal);

            adocaoRepo.save(adocao);


            System.out.println("TESTE CONCLUÍDO");

        };
    }
}
