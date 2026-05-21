package br.com.ifpb.adotaifpb.config;

import br.com.ifpb.adotaifpb.entities.Cargo;
import br.com.ifpb.adotaifpb.repository.CargoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataLoader implements CommandLineRunner {

    private final CargoRepository cargoRepository;

    public DataLoader(CargoRepository cargoRepository) {
        this.cargoRepository = cargoRepository;
    }

    @Override
    public void run(String... args) throws Exception {

        if (cargoRepository.findByNome("CARGO_USUARIO").isEmpty()) {
            Cargo usuario = new Cargo();
            usuario.setNome("CARGO_USUARIO");
            cargoRepository.save(usuario);
        }

        if (cargoRepository.findByNome("CARGO_ADMIN").isEmpty()) {
            Cargo admin = new Cargo();
            admin.setNome("CARGO_ADMIN");
            cargoRepository.save(admin);
        }
    }
}
