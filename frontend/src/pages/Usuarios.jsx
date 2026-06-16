import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { listarUsuarios } from '../services/userService';
import '../styles/Home.css';

//faltando criar aqui o css pra ess tela, precisa atenção

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
        setErro("Falha ao carregar usuários. Tente novamente.");
      } finally {
        setCarregando(false);
      }
    };

    carregarUsuarios();
  }, []);

  const handleGerarUsuario = () => {
    navigate('/cadastro-usuarios');
  };

  return (
    <div className="home-container">
      {/* Navbar mantendo a identidade visual */}
      <nav className="navbar">
        <h3 className="navbar-brand">AdotaIFPB</h3>
        <div className="navbar-links">
          <Link to="/home" className="nav-link">Início</Link>
          <Link to="/animais" className="nav-link">Animais</Link>
          <Link to="/usuarios" className="nav-link nav-link-active">Usuários</Link>
        </div>
        <button onClick={() => { localStorage.removeItem('usuario_autenticado'); navigate('/login'); }} className="btn-logout">
          Sair
        </button>
      </nav>

      {/* Conteúdo do Gerenciamento de Usuários */}
      <div className="content-wrapper" style={{ textAlign: 'center' }}>
        <h1>Gerenciamento de Usuários</h1>
        <p className="main-description">
          Gerenciar usuários cadastrados no sistema.
        </p>
        
        <button 
          onClick={handleGerarUsuario} 
          style={{ padding: '15px 30px', backgroundColor: '#004c00', color: '#white', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '20px' }}
        >
          NOVO USUÁRIO
        </button>

        {/* Seção de Listagem de Usuários */}
        <div style={{ marginTop: '40px', textAlign: 'left' }}>
          <h2>Lista de Usuários</h2>
          {carregando ? (
            <p>Carregando usuários...</p>
          ) : erro ? (
            <p style={{ color: 'red' }}>{erro}</p>
          ) : usuarios.length === 0 ? (
            <p>Nenhum usuário cadastrado.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f0f0f0', borderBottom: '2px solid #004c00' }}>
                    <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>ID</th>
                    <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>Nome</th>
                    <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>Email</th>
                    <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>Telefone</th>
                    <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>Vínculo IFPB</th>
                    <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>Cargo</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((usuario) => (
                    <tr key={usuario.id} style={{ borderBottom: '1px solid #ddd' }}>
                      <td style={{ padding: '10px' }}>{usuario.id}</td>
                      <td style={{ padding: '10px' }}>{usuario.nome}</td>
                      <td style={{ padding: '10px' }}>{usuario.email}</td>
                      <td style={{ padding: '10px' }}>{usuario.telefone || '-'}</td>
                      <td style={{ padding: '10px' }}>{usuario.vinculoIFPB}</td>
                      <td style={{ padding: '10px' }}>{usuario.cargo ? usuario.cargo.nome : '-'}</td>
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
