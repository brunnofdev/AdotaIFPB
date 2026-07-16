import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cadastrarSolicitacao } from '../services/solicitacaoService';
import { buscarAnimalPorId } from '../services/animalService';
import { useAuth } from '../contexts/UseAuth';
import toast from 'react-hot-toast';
import '../styles/CadastroSolicitacao.css';

const CadastroSolicitacao = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [carregando, setCarregando] = useState(false);
  const [carregandoAnimal, setCarregandoAnimal] = useState(false);
  const [dadosAnimal, setDadosAnimal] = useState(null);
  
  const [formData, setFormData] = useState({
    animalId: location.state?.animalId || '',
    observacao: ''
  });

  const carregarDadosAnimal = async (animalId) => {
    setCarregandoAnimal(true);
    try {
      const dados = await buscarAnimalPorId(animalId);
      setDadosAnimal(dados);
    } catch (error) {
      console.error("Erro ao buscar animal:", error);
      toast.error("Erro ao carregar dados do animal. Verifique o ID informado.");
      setDadosAnimal(null);
    } finally {
      setCarregandoAnimal(false);
    }
  };

  useEffect(() => {
    if (formData.animalId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      carregarDadosAnimal(formData.animalId);
    }
  }, [formData.animalId]);

  const handleVoltar = () => {
    navigate('/home');
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

    if (!formData.animalId) {
      toast.error('Por favor, selecione um animal.');
      return;
    }

    setCarregando(true);

    if (!user) {
      toast.error("Erro: Usuário não identificado. Por favor, faça login novamente.");
      setCarregando(false);
      return;
    }

    const usuarioId = user.userId || user.sub;

    if (!usuarioId) {
      toast.error("Erro: Não foi possível identificar seu ID de usuário.");
      setCarregando(false);
      return;
    }

    const payload = {
      animalId: Number(formData.animalId),
      usuarioId: Number(usuarioId),
      observacaoUsuario: formData.observacao
    };

    try {
      await cadastrarSolicitacao(payload);
      toast.success('Solicitação criada com sucesso! Redirecionando...');
      setTimeout(() => {
        navigate('/home');
      }, 1500);
    } catch (error) {
      console.error("Erro ao criar solicitação:", error);
      toast.error("Erro ao registrar a solicitação. Verifique se o animal existe e tente novamente.");
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

        {user && (
          <div className="usuario-info">
            ✓ Conectado como: <strong>{user.email || user.sub || 'Usuário'}</strong>
          </div>
        )}

        <form onSubmit={handleSubmit}>
        
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