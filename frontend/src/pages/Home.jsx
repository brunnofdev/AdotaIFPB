import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Home.css'; 

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const estouLogado = localStorage.getItem('usuario_autenticado');
    if (!estouLogado) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('usuario_autenticado');
    navigate('/login');
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <h3 className="navbar-brand">AdotaIFPB</h3>
        <div className="navbar-links">
          <Link to="/home" className="nav-link nav-link-active">Início</Link>
          <Link to="/animais" className="nav-link">Animais</Link>
          <Link to="/usuarios" className="nav-link">Usuários</Link>
          <Link to="/solicitacoes" className="nav-link">Adoções</Link>
        </div>
        <button onClick={handleLogout} className="btn-logout">
          Sair
        </button>
      </nav>

      <div className="content-wrapper">
        <h1 className="main-title">Bem-vindo ao Sistema de Adoção IFPB</h1>
        <p className="main-description">
          Esta aplicação tem como principal objetivo centralizar informações, facilitar a comunicação entre interessados e promover maior transparência no processo de adoção de animais abandonados no âmbito do instituto.
        </p>
        <div className="tip-box">
          <strong>Dica de navegação:</strong> Utilize os links na barra superior para gerenciar os cadastros de animais, usuários e acompanhar as solicitações de adoção.
        </div>
      </div>
    </div>
  );
}

export default Home;