import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { listarSolicitacoes } from '../services/solicitacaoService';
import '../styles/Solicitacoes.css';

const Solicitacoes = () => {
  const navigate = useNavigate();
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    carregarSolicitacoes();
  }, []);

  const carregarSolicitacoes = async () => {
    try {
      const data = await listarSolicitacoes();
      // Verificação para evitar que a tela quebre se não for um array
      if (data && data.content) {
        setSolicitacoes(data.content);
      } else if (Array.isArray(data)) {
        setSolicitacoes(data);
      } else {
        setSolicitacoes([]);
      }
      setCarregando(false);
    } catch (err) {
      console.error("Erro ao carregar solicitações:", err);
      setErro("Não foi possível carregar as solicitações.");
      setCarregando(false);
    }
  };

  const handleVisualizar = (id) => {
    navigate(`/editar-solicitacao/${id}`);
  };

  const handleVoltar = () => {
    navigate('/home');
  };

  return (
    <div className="solicitacoes-page">
      <div className="solicitacoes-container">
        <div className="solicitacoes-header">
          <h2>Gerenciar Solicitações de Adoção</h2>
          <button className="btn secondary" onClick={handleVoltar}>Voltar</button>
        </div>

        {carregando ? (
          <p className="loading-text">A carregar solicitações...</p>
        ) : erro ? (
          <p className="error-text">{erro}</p>
        ) : solicitacoes.length === 0 ? (
          <p className="empty-text">Não há solicitações pendentes de momento.</p>
        ) : (
          <div className="cards-grid">
            {solicitacoes.map((solicitacao) => (
              <div className="solicitacao-card" key={solicitacao.id}>
                <div className="card-info">
                  <h3>Animal: <span>{solicitacao.nomeAnimal}</span></h3>
                  <p><strong>Adotante:</strong> {solicitacao.nomeAdotante}</p>
                  <p><strong>Data:</strong> {solicitacao.dataSolicitacao ? new Date(solicitacao.dataSolicitacao).toLocaleDateString('pt-BR') : '-'}</p>
                  
                  <p><strong>Status:</strong> <span className={`status-badge ${(solicitacao.status || 'pendente').toLowerCase()}`}>{solicitacao.status || 'PENDENTE'}</span></p>
                  
                  {solicitacao.observacaoUsuario && (
                    <div className="observacao-box">
                      <strong>Obs:</strong> {solicitacao.observacaoUsuario}
                    </div>
                  )}
                </div>
                
                {solicitacao.status !== 'APROVADA' && (
                  <div className="card-actions">
                    <button 
                      className="btn-visualizar" 
                      onClick={() => handleVisualizar(solicitacao.id)}
                      title="Visualizar detalhes da solicitação"
                    >
                      Visualizar
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Solicitacoes;