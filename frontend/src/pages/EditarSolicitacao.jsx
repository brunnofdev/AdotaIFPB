import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { buscarSolicitacaoPorId, aprovarSolicitacao, cancelarSolicitacao } from '../services/solicitacaoService';
import '../styles/EditarSolicitacao.css';

const EditarSolicitacao = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [carregando, setCarregando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState(null);
  const [sucesso, setSucesso] = useState(false);
  const [solicitacao, setSolicitacao] = useState(null);

  const [expandido, setExpandido] = useState({
    animal: true,
    usuario: true,
    solicitacao: true
  });

  useEffect(() => {
    carregarSolicitacao();
  }, [id]);

  const carregarSolicitacao = async () => {
    try {
      setCarregando(true);
      setErro(null);
      const dados = await buscarSolicitacaoPorId(id);
      setSolicitacao(dados);
    } catch (error) {
      console.error("Erro ao carregar solicitação:", error);
      setErro("Erro ao carregar os dados da solicitação. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  };

  const toggleExpandir = (secao) => {
    setExpandido((prev) => ({
      ...prev,
      [secao]: !prev[secao]
    }));
  };

  const handleAprovar = async () => {
    const confirmar = window.confirm(
      `Deseja aprovar a solicitação do animal "${solicitacao.nomeAnimal}"?`
    );
    if (!confirmar) return;

    setEnviando(true);
    setErro(null);
    setSucesso(false);

    try {
      await aprovarSolicitacao(id);
      setSucesso(true);
      setTimeout(() => {
        navigate('/solicitacoes');
      }, 1500);
    } catch (error) {
      console.error("Erro ao aprovar solicitação:", error);
      setErro("Erro ao aprovar a solicitação. Tente novamente.");
    } finally {
      setEnviando(false);
    }
  };

  const handleCancelar = async () => {
    const confirmar = window.confirm(
      `Deseja cancelar a solicitação do animal "${solicitacao.nomeAnimal}"?`
    );
    if (!confirmar) return;

    setEnviando(true);
    setErro(null);
    setSucesso(false);

    try {
      await cancelarSolicitacao(id);
      setSucesso(true);
      setTimeout(() => {
        navigate('/solicitacoes');
      }, 1500);
    } catch (error) {
      console.error("Erro ao cancelar solicitação:", error);
      setErro("Erro ao cancelar a solicitação. Tente novamente.");
    } finally {
      setEnviando(false);
    }
  };

  const handleVoltar = () => {
    navigate('/solicitacoes');
  };

  if (carregando) {
    return (
      <div className="editar-solicitacao-page">
        <div className="editar-solicitacao-container">
          <p className="carregando-text">Carregando dados da solicitação...</p>
        </div>
      </div>
    );
  }

  if (!solicitacao) {
    return (
      <div className="editar-solicitacao-page">
        <div className="editar-solicitacao-container">
          <p className="erro-text">Solicitação não encontrada.</p>
          <button className="btn-voltar" onClick={handleVoltar}>Voltar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="editar-solicitacao-page">
      <div className="editar-solicitacao-container">
        <h1>Detalhes da Solicitação</h1>
        <p>Segue abaixo os detalhes da solicitação</p>

        {sucesso && (
          <div className="editar-solicitacao-sucesso">
            ✓ Operação realizada com sucesso! Redirecionando...
          </div>
        )}

        {erro && (
          <div className="editar-solicitacao-erro">
            ✗ {erro}
          </div>
        )}

        <div className="secao-colapsavel">
          <div 
            className="secao-header" 
            onClick={() => toggleExpandir('animal')}
          >
            <span className={`seta ${expandido.animal ? 'expandido' : ''}`}>▼</span>
            <h2>Informações do Animal</h2>
          </div>
          {expandido.animal && (
            <div className="secao-conteudo informacoes-animal">
              <div className="info-grid">
                <div className="info-item">
                  <label>Nome:</label>
                  <p>{solicitacao.nomeAnimal}</p>
                </div>
                <div className="info-item">
                  <label>Espécie:</label>
                  <p>{solicitacao.especieAnimal || 'N/A'}</p>
                </div>
                <div className="info-item">
                  <label>Raça:</label>
                  <p>{solicitacao.racaAnimal || 'N/A'}</p>
                </div>
                <div className="info-item">
                  <label>Sexo:</label>
                  <p>{solicitacao.sexoAnimal || 'N/A'}</p>
                </div>
                <div className="info-item">
                  <label>Peso:</label>
                  <p>{solicitacao.pesoAnimal ? `${solicitacao.pesoAnimal} kg` : 'N/A'}</p>
                </div>
                <div className="info-item">
                  <label>Castrado:</label>
                  <p>{solicitacao.castradoAnimal ? 'Sim' : 'Não'}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Seção: Informações do Usuário */}
        <div className="secao-colapsavel">
          <div 
            className="secao-header" 
            onClick={() => toggleExpandir('usuario')}
          >
            <span className={`seta ${expandido.usuario ? 'expandido' : ''}`}>▼</span>
            <h2>Informações do Usuário</h2>
          </div>
          {expandido.usuario && (
            <div className="secao-conteudo informacoes-usuario">
              <div className="info-grid">
                <div className="info-item">
                  <label>Nome:</label>
                  <p>{solicitacao.nomeAdotante}</p>
                </div>
                <div className="info-item">
                  <label>Email:</label>
                  <p>{solicitacao.emailAdotante || 'N/A'}</p>
                </div>
                <div className="info-item">
                  <label>Telefone:</label>
                  <p>{solicitacao.telefonAdotante || 'N/A'}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Seção: Informações da Solicitação */}
        <div className="secao-colapsavel">
          <div 
            className="secao-header" 
            onClick={() => toggleExpandir('solicitacao')}
          >
            <span className={`seta ${expandido.solicitacao ? 'expandido' : ''}`}>▼</span>
            <h2>Informações da Solicitação</h2>
          </div>
          {expandido.solicitacao && (
            <div className="secao-conteudo informacoes-solicitacao">
              <div className="info-grid">
                <div className="info-item">
                  <label>Status:</label>
                  <p>
                    <span className={`status-badge ${(solicitacao.status || 'pendente').toLowerCase()}`}>
                      {solicitacao.status || 'PENDENTE'}
                    </span>
                  </p>
                </div>
                <div className="info-item">
                  <label>Data da Solicitação:</label>
                  <p>{solicitacao.dataSolicitacao ? new Date(solicitacao.dataSolicitacao).toLocaleDateString('pt-BR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                  }) : 'N/A'}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Observações do Usuário */}
        <div className="form-group">
          <label>Observações do Usuário</label>
          <textarea 
            disabled
            value={solicitacao.observacaoUsuario || 'Sem observações'}
            className="observacoes-textarea"
          />
        </div>

        {/* Botões de Ação */}
        {solicitacao.status !== 'APROVADA' && (
          <div className="editar-solicitacao-botoes">
            <button
              className="btn-aprovar"
              onClick={handleAprovar}
              disabled={enviando}
            >
              {enviando ? 'Aprovando...' : 'APROVAR'}
            </button>
            <button
              className="btn-cancelar"
              onClick={handleCancelar}
              disabled={enviando}
            >
              {enviando ? 'Cancelando...' : 'REPROVAR'}
            </button>
            <button
              className="btn-voltar"
              onClick={handleVoltar}
              disabled={enviando}
            >
              VOLTAR
            </button>
          </div>
        )}

        {solicitacao.status === 'APROVADA' && (
          <div className="editar-solicitacao-botoes">
            <button
              className="btn-voltar"
              onClick={handleVoltar}
            >
              VOLTAR
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditarSolicitacao;
