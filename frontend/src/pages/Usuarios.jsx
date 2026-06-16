import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { listarUsuarios } from '../services/userService';
import '../styles/Home.css';
//  fazer um Usuarios.css separado dps?

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
      <div className="content-wrapper" style={{ textAlign: 'center' }}>
        <h1>Gerenciamento de Usuários</h1>
        <p className="main-description">
          Gerenciar usuários cadastrados no sistema.
        </p>
        
        <button 
          onClick={handleGerarUsuario} 
          // CORREÇÃO AQUI: color: 'white' em vez de '#white'
          style={{ padding: '15px 30px', backgroundColor: '#004c00', color: 'white', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '20px' }}
        >
          NOVO USUÁRIO
        </button>

        {/* Seção de Listagem */}
        <div style={{ marginTop: '40px', textAlign: 'left' }}>
          <h2>Lista de Usuários</h2>
          
          {carregando && <p>Carregando usuários...</p>}
          {erro && <p style={{ color: 'red' }}>{erro}</p>}
          {!carregando && !erro && usuarios.length === 0 && <p>Nenhum usuário cadastrado.</p>}

          {!carregando && !erro && usuarios.length > 0 && (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f0f0f0', borderBottom: '2px solid #004c00' }}>
                    <th style={{ padding: '10px', textAlign: 'left' }}>ID</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Nome</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Email</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Telefone</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Vínculo</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Cargo</th>
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
                      {/* BOAS PRÁTICAS: Uso do Optional Chaining (?.) */}
                      <td style={{ padding: '10px' }}>{usuario.cargo?.nome || '-'}</td>
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