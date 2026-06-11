import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('usuario_autenticado');
    navigate('/login');
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh', backgroundColor: '#fafafa' }}>
      {/* Barra de Navegação Superior (Navbar) */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', height: '60px', backgroundColor: '#004c00', color: '#fff' }}>
        <h3 style={{ margin: 0 }}>AdotaIFPB</h3>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link to="/home" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Início</Link>
          <Link to="/animais" style={{ color: '#fff', textDecoration: 'none' }}>Animais</Link>
          <Link to="/usuarios" style={{ color: '#fff', textDecoration: 'none' }}>Usuários</Link>
        </div>
        <button onClick={handleLogout} style={{ padding: '6px 12px', backgroundColor: '#d32f2f', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Sair
        </button>
      </nav>

      {/* Conteúdo da Página */}
      <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ color: '#333' }}>Bem-vindo ao Sistema de Adoção IFPB</h1>
        <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.6' }}>
          Esta aplicação tem como principal objetivo centralizar informações, facilitar a comunicação entre interessados e promover maior transparência no processo de adoção de animais abandonados no âmbito do instituto.
        </p>
        <div style={{ marginTop: '30px', padding: '20px', borderRadius: '6px', backgroundColor: '#e8f5e9', borderLeft: '5px solid #004c00' }}>
          <strong>Dica de navegação:</strong> Utilize os links na barra superior para gerenciar os cadastros de animais ou visualizar os adotantes do sistema.
        </div>
      </div>
    </div>
  );
}

export default Home;