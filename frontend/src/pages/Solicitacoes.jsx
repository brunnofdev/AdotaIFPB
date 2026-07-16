import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { listarSolicitacoes, listarAdocoes, buscarSolicitacoesUsersPorId, buscarAdocaoUsersPorId } from '../services/solicitacaoService';
import { useAuth } from '../contexts/UseAuth';
import '../styles/Solicitacoes.css';

const Solicitacoes = () => {
  const navigate = useNavigate();
  const { hasRole, user } = useAuth();
  const isAdmin = hasRole('ROLE_ADMIN');
  const userId = user.userId || user.sub;
  
  const [abaSelecionada, setAbaSelecionada] = useState('solicitacoes');
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [adocoes, setAdocoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    if (abaSelecionada === 'solicitacoes') {
      carregarSolicitacoes();
    } else {
      carregarAdocoes();
    }
  }, [abaSelecionada]);

  const carregarSolicitacoes = async () => {
    try {
      setCarregando(true);
      setErro(null);
      let data;
      
      if (isAdmin) {
        data = await listarSolicitacoes();
      } else {
        if (!userId) {
          setErro("Erro: ID do usuário não encontrado. Por favor, faça login novamente.");
          setCarregando(false);
          return;
        }
        data = await buscarSolicitacoesUsersPorId(userId);
      }
      
      if (data && data.content) {
        setSolicitacoes(data.content);
      } else if (Array.isArray(data)) {
        setSolicitacoes(data);
      } else {
        setSolicitacoes([]);
      }
    } catch (err) {
      console.error("Erro ao carregar solicitações:", err);
      setErro("Não foi possível carregar as solicitações.");
    } finally {
      setCarregando(false);
    }
  };

  const carregarAdocoes = async () => {
    try {
      setCarregando(true);
      setErro(null);
      let data;
      
      if (isAdmin) {
        data = await listarAdocoes();
      } else {
        if (!userId) {
          setErro("Erro: ID do usuário não encontrado. Por favor, faça login novamente.");
          setCarregando(false);
          return;
        }
        data = await buscarAdocaoUsersPorId(userId);
      }
      
      if (data && data.content) {
        setAdocoes(data.content);
      } else if (Array.isArray(data)) {
        setAdocoes(data);
      } else {
        setAdocoes([]);
      }
    } catch (err) {
      console.error("Erro ao carregar adoções:", err);
      setErro("Não foi possível carregar as adoções.");
    } finally {
      setCarregando(false);
    }
  };

  const handleVisualizar = (id) => {
    navigate(`/editar-solicitacao/${id}`);
  };

  const handleVoltar = () => {
    navigate('/home');
  };

  const trocarAba = () => {
    setAbaSelecionada(abaSelecionada === 'solicitacoes' ? 'adocoes' : 'solicitacoes');
  };

  return (
    <div className="solicitacoes-page">
      <div className="solicitacoes-container">
        <div className="solicitacoes-header">
          <h2>
            {abaSelecionada === 'solicitacoes' 
              ? 'Gerenciar Solicitações' 
              : 'Gerenciar Adoções'}
          </h2>
          <div className="header-buttons">
            <button 
              className={`btn toggle-aba ${abaSelecionada === 'adocoes' ? 'active' : ''}`}
              onClick={trocarAba}
              title={abaSelecionada === 'solicitacoes' ? 'Ver Adoções' : 'Ver Solicitações'}
            >
              {abaSelecionada === 'solicitacoes' ? 'Ver Adoções' : 'Ver Solicitações'}
            </button>
            <button className="btn secondary" onClick={handleVoltar}>Voltar</button>
          </div>
        </div>

        {abaSelecionada === 'solicitacoes' ? (
          <>
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
                    
                    {isAdmin && solicitacao.status !== 'APROVADA' && (
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
          </>
        ) : (
          <>
            {carregando ? (
              <p className="loading-text">A carregar adoções...</p>
            ) : erro ? (
              <p className="error-text">{erro}</p>
            ) : adocoes.length === 0 ? (
              <p className="empty-text">Não há adoções registradas no momento.</p>
            ) : (
              <div className="cards-grid">
                {adocoes.map((adocao) => (
                  <div className="solicitacao-card" key={adocao.id}>
                    <div className="card-info">
                      <h3>Animal: <span>{adocao.nomeAnimal}</span></h3>
                      <p><strong>Adotante:</strong> {adocao.nomeAdotante}</p>
                      <p><strong>Data da Adoção:</strong> {adocao.dataAdocao ? new Date(adocao.dataAdocao).toLocaleDateString('pt-BR') : '-'}</p>
                      {adocao.observacaoUsuario && (
                        <div className="observacao-box">
                          <strong>Obs:</strong> {adocao.observacaoUsuario}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Solicitacoes;