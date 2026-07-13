package br.com.ifpb.adotaifpb.config;

import br.com.ifpb.adotaifpb.entities.Cargo;
import br.com.ifpb.adotaifpb.repository.CargoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

@Configuration(proxyBeanMethods = false)
public class DataLoader implements CommandLineRunner {

    private final CargoRepository cargoRepository;

    public DataLoader(CargoRepository cargoRepository) {
        this.cargoRepository = cargoRepository;
    }

    @Override
    public void run(String... args) throws Exception {

        if (cargoRepository.findByNome("ROLE_USER").isEmpty()) {
            Cargo usuario = new Cargo();
            usuario.setNome("ROLE_USER");
            cargoRepository.save(usuario);
        }

        if (cargoRepository.findByNome("ROLE_ADMIN").isEmpty()) {
            Cargo admin = new Cargo();
            admin.setNome("ROLE_ADMIN");
            cargoRepository.save(admin);
        }
    }
}
