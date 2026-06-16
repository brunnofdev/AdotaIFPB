import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { listarUsuarios } from '../services/userService';
import '../styles/Home.css';
import '../styles/Usuarios.css';

function Usuarios() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const carregarUsuarios = async () => {
      try {
        setCarregando(true);
        const dados = await listarUsuarios();
        setUsuarios(dados);
      } catch (error) {
        console.error("Erro ao carregar usuários:", error);
        setErro("Falha ao carregar usuários. Verifique a conexão ou a permissão (CORS/401).");
      } finally {
        setCarregando(false);
      }
    };

    carregarUsuarios();
  }, []);

  const handleGerarUsuario = () => {
    navigate('/cadastro-usuarios');
  };

  const handleLogout = () => {
    localStorage.removeItem('usuario_autenticado');
    navigate('/login');
  };

  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <h3 className="navbar-brand">AdotaIFPB</h3>
        <div className="navbar-links">
          <Link to="/home" className="nav-link">Início</Link>
          <Link to="/animais" className="nav-link">Animais</Link>
          <Link to="/usuarios" className="nav-link nav-link-active">Usuários</Link>
        </div>
        <button onClick={handleLogout} className="btn-logout">
          Sair
        </button>
      </nav>

      {/* Conteúdo Principal */}
      <div className="content-wrapper usuarios-content">
        <h1>Gerenciamento de Usuários</h1>
        <p className="main-description">
          Gerenciar usuários cadastrados no sistema.
        </p>
        
        <button 
          onClick={handleGerarUsuario}
          className="btn-novo-usuario"
        >
          NOVO USUÁRIO
        </button>

        {/* Seção de Listagem */}
        <div className="usuarios-listagem-section">
          <h2>Lista de Usuários</h2>
          
          {carregando && <p>Carregando usuários...</p>}
          {erro && <p className="usuarios-erro">{erro}</p>}
          {!carregando && !erro && usuarios.length === 0 && <p>Nenhum usuário cadastrado.</p>}

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
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((usuario) => (
                    <tr key={usuario.id}>
                      <td>{usuario.id}</td>
                      <td>{usuario.nome}</td>
                      <td>{usuario.email}</td>
                      <td>{usuario.telefone || '-'}</td>
                      <td>{usuario.vinculoIFPB}</td>
                      <td>{usuario.cargo?.nome || '-'}</td>
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