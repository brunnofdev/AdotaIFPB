import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { listarUsuarios } from '../services/userService';
import '../styles/Home.css';
import '../styles/Usuarios.css';
import '../styles/Button.css'


function Usuarios() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const ITENS_POR_PAGINA = 5;

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const carregarUsuarios = async () => {
    try {
      setCarregando(true);
      const dados = await listarUsuarios();
      setUsuarios(dados);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
      setErro("Falha ao carregar usuários. Verifique a conexão ou a permissão.");
    } finally {
      setCarregando(false);
    }
  };

  const handleGerarUsuario = () => {
    navigate('/cadastro-usuarios');
  };

  const handleLogout = () => {
    localStorage.removeItem('usuario_autenticado');
    navigate('/login');
  };

  const handleEditar = (id) => {
    navigate(`/editar-usuario/${id}`);
  };

  // Cálculos de paginação
  const totalPaginas = Math.ceil(usuarios.length / ITENS_POR_PAGINA);
  const indiceInicio = (paginaAtual - 1) * ITENS_POR_PAGINA;
  const indiceFim = indiceInicio + ITENS_POR_PAGINA;
  const usuariosPaginados = usuarios.slice(indiceInicio, indiceFim);

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
          <Link to="/animais" className="nav-link">Animais</Link>
          <Link to="/usuarios" className="nav-link nav-link-active">Usuários</Link>
          <Link to="/solicitacoes" className="nav-link">Adoções</Link>
        </div>
        <button onClick={handleLogout} className="btn-logout">Sair</button>
      </nav>

      <div className="content-wrapper">
        
        <div className="usuarios-header-actions">
          <h1 className="main-title">Gerenciar Usuários</h1>
        </div>

        <div className="usuarios-content">
          {carregando && <p className="loading-text">A carregar dados...</p>}
          
          {erro && <p className="error-text">{erro}</p>}
          
          {!carregando && !erro && usuarios.length === 0 && (
            <p className="empty-text">Nenhum usuário cadastrado no sistema.</p>
          )}

          {!carregando && !erro && usuarios.length > 0 && (
            <div className="usuarios-table-wrapper">
              <table className="usuarios-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>Vínculo</th>
                    <th>Cargo</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {usuariosPaginados.map((usuario) => (
                    <tr key={usuario.id}>
                      <td>{usuario.id}</td>
                      <td className="usuarios-nome">{usuario.nome}</td>
                      <td>{usuario.email}</td>
                      <td>{usuario.telefone || '-'}</td>
                      
                      <td>{usuario.vinculoIFPB}</td>
                      
                      <td>
                        <span className="cargo-badge">
                          {usuario.cargo?.nome.replace('CARGO_', '') || '-'}
                        </span>
                      </td>

                      <td>
                        <button 
                          className="btn-danger-sm" 
                          onClick={() => handleEditar(usuario.id)}
                          title="Editar/Remover Usuário"
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

export default Usuarios;