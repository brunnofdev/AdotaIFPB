import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { listarAnimais } from '../services/animalService';
import '../styles/Animais.css';
import '../styles/Button.css'

function Animais() {
  const navigate = useNavigate();
  const [animais, setAnimais] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const ITENS_POR_PAGINA = 5;

  
  useEffect(() => {
    carregarAnimais();
  }, []);
  
  const carregarAnimais = async () => {
    try {
      setCarregando(true);
      const dados = await listarAnimais();
      setAnimais(dados);
    } catch (error) {
      console.error("Erro ao carregar animais:", error);
      setErro("Falha ao carregar os animais. Verifique se a API está online.");
    } finally {
      setCarregando(false);
    }
  };

  const handleNovoAnimal = () => {
    navigate('/cadastro-animais');
  };

  const handleNovoAbrigo = () => {
    navigate('/cadastro-abrigo');
  };

  const handleNovaVacina = () => {
    navigate('/cadastro-vacina');
  };

  const handleLogout = () => {
    localStorage.removeItem('usuario_autenticado');
    navigate('/login');
  };

  const handleEditar = (id) => {
    navigate(`/editar-animal/${id}`);
  };

  // Formatar o YearMonth (YYYY-MM) para MM/YYYY
  const formatarNascimento = (dataString) => {
    if (!dataString) return '-';
    const [ano, mes] = dataString.split('-');
    return `${mes}/${ano}`;
  };

  // Cálculos de paginação
  const totalPaginas = Math.ceil(animais.length / ITENS_POR_PAGINA);
  const indiceInicio = (paginaAtual - 1) * ITENS_POR_PAGINA;
  const indiceFim = indiceInicio + ITENS_POR_PAGINA;
  const animaisPaginados = animais.slice(indiceInicio, indiceFim);

  const irProximaPagina = () => {
    if (paginaAtual < totalPaginas) {
      setPaginaAtual(paginaAtual + 1);
    }
  };

  const irPaginaAnterior = () => {
    if (paginaAtual > 1) {
      setPaginaAtual(paginaAtual - 1);
    }
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <h3 className="navbar-brand">AdotaIFPB</h3>
        <div className="navbar-links">
          <Link to="/home" className="nav-link">Início</Link>
          <Link to="/animais" className="nav-link nav-link-active">Animais</Link>
          <Link to="/usuarios" className="nav-link">Usuários</Link>
          <Link to="/solicitacoes" className="nav-link">Adoções</Link>
        </div>
        <button onClick={handleLogout} className="btn-logout">Sair</button>
      </nav>

      <div className="content-wrapper">
        <div className="animais-header-actions">
          <h1 className="main-title">Gerenciar Animais</h1>
          <div className="action-buttons">
            <button className="btn primary" onClick={handleNovoAnimal}>
              Novo Animal
            </button>
            <button className="btn secondary" onClick={handleNovoAbrigo}>
              Novo Abrigo
            </button>
            <button className="btn secondary" onClick={handleNovaVacina}>
              Nova Vacina
            </button>
          </div>
        </div>

        <div className="animais-content">
          {carregando && <p className="loading-text">A carregar dados...</p>}
          
          {erro && <p className="error-text">{erro}</p>}
          
          {!carregando && !erro && animais.length === 0 && (
            <p className="empty-text">Nenhum animal cadastrado no sistema.</p>
          )}

          {!carregando && !erro && animais.length > 0 && (
            <div className="animais-table-wrapper">
              <table className="animais-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Espécie</th>
                    <th>Raça</th>
                    <th>Nasc. Estimado</th>
                    <th>Sexo</th>
                    <th>Abrigo</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {animaisPaginados.map((animal) => (
                    <tr key={animal.id}>
                      <td className="animais-nome">{animal.nome}</td>
                       
                      <td>{animal.especie === 'CACHORRO' ? 'Cachorro' : 'Gato'}</td>
                       
                      <td>{animal.raca || 'S.R.D.'}</td>
                       
                      <td>{formatarNascimento(animal.nascimentoEstimado)}</td>
                       
                      <td>{animal.sexoAnimal === 'MACHO' ? 'Macho' : 'Fêmea'}</td>
                       
                      <td>{animal.abrigo?.nome || '-'}</td>
                       
                      <td>
                        <span className={`status-badge ${animal.status === 'DISPONIVEL' ? 'disponivel' : 'adotado'}`}>
                          {animal.status}
                        </span>
                      </td>
                       
                      <td>
                        <button 
                          className="btn-danger-sm" 
                          onClick={() => handleEditar(animal.id)}
                          title="Editar Animal"
                        >
                          Editar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
               
              <div className="pagination-controls">
                <button 
                  className="btn pagination-btn"
                  onClick={irPaginaAnterior}
                  disabled={paginaAtual === 1}
                >
                  ← Anterior
                </button>
                <span className="pagination-info">
                  Página {paginaAtual} de {totalPaginas}
                </span>
                <button 
                  className="btn pagination-btn"
                  onClick={irProximaPagina}
                  disabled={paginaAtual === totalPaginas}
                >
                  Próxima →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Animais;