package br.com.ifpb.adotaifpb.services;

import br.com.ifpb.adotaifpb.repository.CargoRepository;
import org.springframework.stereotype.Service;

@Service
public class CargoService {

    private final CargoRepository cargoRepository;

    public CargoService(CargoRepository cargoRepository) {
        this.cargoRepository = cargoRepository;
    }
}
