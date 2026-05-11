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
}
