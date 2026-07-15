import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cadastrarSolicitacao } from '../services/solicitacaoService';
import { buscarAnimalPorId } from '../services/animalService';
import '../styles/CadastroSolicitacao.css';

const CadastroSolicitacao = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);
  const [carregandoAnimal, setCarregandoAnimal] = useState(false);
  const [dadosAnimal, setDadosAnimal] = useState(null);
  
  const [formData, setFormData] = useState({
    animalId: location.state?.animalId || '',
    usuarioId: '',
    observacao: ''
  });

  useEffect(() => {
    if (formData.animalId) {
      carregarDadosAnimal(formData.animalId);
    }
  }, [formData.animalId]);

  const carregarDadosAnimal = async (animalId) => {
    setCarregandoAnimal(true);
    setErro(null);
    try {
      const dados = await buscarAnimalPorId(animalId);
      setDadosAnimal(dados);
    } catch (error) {
      console.error("Erro ao buscar animal:", error);
      setErro("Erro ao carregar dados do animal. Verifique o ID informado.");
      setDadosAnimal(null);
    } finally {
      setCarregandoAnimal(false);
    }
  };

  const handleVoltar = () => {
    navigate('/solicitacoes');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'animalId' && value) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else if (name !== 'animalId') {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setErro(null);

    // Monta o payload convertendo os IDs para números
    const payload = {
      animalId: Number(formData.animalId),
      usuarioId: Number(formData.usuarioId),
      observacao: formData.observacao
    };

    try {
      await cadastrarSolicitacao(payload);
      alert('Solicitação criada com sucesso!');
      navigate('/solicitacoes');
    } catch (error) {
      console.error("Erro ao criar solicitação:", error);
      setErro("Erro ao registrar a solicitação. Verifique se os IDs existem no sistema.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="cadastro-solicitacao-page">
      <div className="cadastro-solicitacao-container">
        <h1>Nova Solicitação</h1>
        <p className="cadastro-solicitacao-descricao">
          Preencha os dados abaixo para registrar o interesse em adotar um animal.
        </p>

        {erro && (
          <div className="cadastro-solicitacao-erro">
            ✗ {erro}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          
          <div className="form-group-row">
            <div className="form-group half-width">
              <label htmlFor="animalId">ID do Animal *</label>
              <input 
                type="number" 
                id="animalId" 
                name="animalId" 
                value={formData.animalId} 
                onChange={handleChange}
                placeholder="Ex: 1"
                required 
                min="1"
              />
            </div>

            <div className="form-group half-width">
              <label htmlFor="usuarioId">ID do Adotante *</label>
              <input 
                type="number" 
                id="usuarioId" 
                name="usuarioId" 
                value={formData.usuarioId} 
                onChange={handleChange}
                placeholder="Ex: 2"
                required 
                min="1"
              />
            </div>
          </div>

          {carregandoAnimal && (
            <div className="carregando-animal">
              Carregando informações do animal...
            </div>
          )}

          {dadosAnimal && (
            <div className="informacoes-animal">
              <h2>Informações do Animal</h2>
              <div className="info-grid">
                <div className="info-item">
                  <label>Nome:</label>
                  <p>{dadosAnimal.nome}</p>
                </div>
                <div className="info-item">
                  <label>Espécie:</label>
                  <p>{dadosAnimal.especie}</p>
                </div>
                <div className="info-item">
                  <label>Raça:</label>
                  <p>{dadosAnimal.raca || 'N/A'}</p>
                </div>
                <div className="info-item">
                  <label>Sexo:</label>
                  <p>{dadosAnimal.sexoAnimal}</p>
                </div>
                <div className="info-item">
                  <label>Peso:</label>
                  <p>{dadosAnimal.peso ? `${dadosAnimal.peso} kg` : 'N/A'}</p>
                </div>
                <div className="info-item">
                  <label>Castrado:</label>
                  <p>{dadosAnimal.castrado ? 'Sim' : 'Não'}</p>
                </div>
                <div className="info-item">
                  <label>Status:</label>
                  <p>{dadosAnimal.status}</p>
                </div>
                <div className="info-item">
                  <label>Nascimento Estimado:</label>
                  <p>{dadosAnimal.nascimentoEstimado || 'N/A'}</p>
                </div>
              </div>
              <div className="info-full-width">
                <label>Descrição:</label>
                <p>{dadosAnimal.descricao}</p>
              </div>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="observacao">Observações Adicionais</label>
            <textarea 
              id="observacao" 
              name="observacao" 
              value={formData.observacao} 
              onChange={handleChange}
              placeholder="Ex: Já possuo outros animais em casa e o pátio é murado..."
              rows="4"
            />
          </div>

          <div className="cadastro-solicitacao-botoes">
            <button 
              type="submit" 
              className="btn-cadastrar"
              disabled={carregando}
            >
              {carregando ? 'ENVIANDO...' : 'CRIAR SOLICITAÇÃO'}
            </button>
            <button
              type="button"
              className="btn-voltar"
              onClick={handleVoltar}
              disabled={carregando}
            >
              CANCELAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CadastroSolicitacao;