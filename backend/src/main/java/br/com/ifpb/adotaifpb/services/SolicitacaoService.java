package br.com.ifpb.adotaifpb.services;

import br.com.ifpb.adotaifpb.dtos.SolicitacaoRequestDTO;
import br.com.ifpb.adotaifpb.dtos.SolicitacaoResponseDTO;
import br.com.ifpb.adotaifpb.entities.Adocao;
import br.com.ifpb.adotaifpb.entities.Animal;
import br.com.ifpb.adotaifpb.entities.Solicitacao;
import br.com.ifpb.adotaifpb.entities.Usuario;
import br.com.ifpb.adotaifpb.repository.AdocaoRepository;
import br.com.ifpb.adotaifpb.repository.AnimalRepository;
import br.com.ifpb.adotaifpb.repository.SolicitacaoRepository;
import br.com.ifpb.adotaifpb.repository.UsuarioRepository;
import br.com.ifpb.adotaifpb.utils.StatusAnimalEnum;
import br.com.ifpb.adotaifpb.utils.StatusSolicitacaoEnum;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SolicitacaoService {

    private final SolicitacaoRepository solicitacaoRepository;
    private final UsuarioRepository usuarioRepository;
    private final AnimalRepository animalRepository;
    private final AdocaoRepository adocaoRepository;

    public SolicitacaoService(SolicitacaoRepository solicitacaoRepository, UsuarioRepository usuarioRepository,
                              AnimalRepository animalRepository, AdocaoRepository adocaoRepository) {
        this.solicitacaoRepository = solicitacaoRepository;
        this.usuarioRepository = usuarioRepository;
        this.animalRepository = animalRepository;
        this.adocaoRepository = adocaoRepository;
    }

    @Transactional
    public SolicitacaoResponseDTO solicitarAdocao(SolicitacaoRequestDTO dto) {
        Usuario usuario = usuarioRepository.findById(dto.usuarioId())
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado."));
        Animal animal = animalRepository.findById(dto.animalId())
                .orElseThrow(() -> new IllegalArgumentException("Animal não encontrado."));

        if (animal.getStatus() != StatusAnimalEnum.DISPONIVEL) {
            throw new IllegalArgumentException("Este animal já não está disponível para adoção.");
        }

        Solicitacao solicitacao = new Solicitacao();
        solicitacao.setUsuario(usuario);
        solicitacao.setAnimal(animal);
        solicitacao.setStatus(StatusSolicitacaoEnum.PENDENTE);

        solicitacao = solicitacaoRepository.save(solicitacao);
        return new SolicitacaoResponseDTO(solicitacao);
    }

    @Transactional
    public void aprovarSolicitacao(Long solicitacaoId) {
        Solicitacao solicitacaoAprovada = solicitacaoRepository.findById(solicitacaoId)
                .orElseThrow(() -> new IllegalArgumentException("Solicitação não encontrada."));

        if (solicitacaoAprovada.getStatus() != StatusSolicitacaoEnum.PENDENTE) {
            throw new IllegalArgumentException("Apenas solicitações pendentes podem ser aprovadas.");
        }

        Animal animal = solicitacaoAprovada.getAnimal();
        if (animal.getStatus() != StatusAnimalEnum.DISPONIVEL) {
            throw new IllegalArgumentException("O animal já foi adotado por outra pessoa.");
        }

        solicitacaoAprovada.setStatus(StatusSolicitacaoEnum.APROVADA);
        solicitacaoRepository.save(solicitacaoAprovada);

        animal.setStatus(StatusAnimalEnum.ADOTADO);
        animalRepository.save(animal);

        List<Solicitacao> outrasSolicitacoes = solicitacaoRepository
                .findAllByAnimalIdAndStatus(animal.getId(), StatusSolicitacaoEnum.PENDENTE);

        for (Solicitacao s : outrasSolicitacoes) {
            s.setStatus(StatusSolicitacaoEnum.REJEITADA);
            solicitacaoRepository.save(s);
        }
        Adocao adocao = new Adocao();
        adocao.setSolicitacao(solicitacaoAprovada);
        adocaoRepository.save(adocao);
    }
    public List<SolicitacaoResponseDTO> listarTodas() {
        StatusSolicitacaoEnum status = StatusSolicitacaoEnum.PENDENTE;
        return solicitacaoRepository.findAllByStatus(status).stream().map(SolicitacaoResponseDTO::new).toList();
    }
}