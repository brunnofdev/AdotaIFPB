import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { listarUsuarios, removerUsuario } from '../services/userService';
import '../styles/Home.css';
import '../styles/Usuarios.css';

function Usuarios() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

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

  // Função para lidar com a exclusão (Soft Delete)
  const handleRemover = async (id, nome) => {
    const confirmar = window.confirm(`Deseja realmente inativar o usuário ${nome}?`);
    if (!confirmar) return;

    try {
      await removerUsuario(id);
      // Atualiza a lista localmente
      setUsuarios((prevUsuarios) => prevUsuarios.filter((usuario) => usuario.id !== id));
      alert("Usuário removido com sucesso!");
    } catch (error) {
      console.error("Erro ao remover usuário:", error);
      alert("Erro ao remover o usuário. Tente novamente.");
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
          <div className="action-buttons">
            <button className="btn-primary" onClick={handleGerarUsuario}>
              + Novo Usuário
            </button>
          </div>
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
                  {usuarios.map((usuario) => (
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
                          onClick={() => handleRemover(usuario.id, usuario.nome)}
                          title="Remover Usuário"
                        >
                          Remover
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Usuarios;