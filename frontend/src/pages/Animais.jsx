import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cadastrarAnimal } from '../services/animalService';
import '../styles/Home.css'; // Reaproveita os estilos da Navbar

function Animais() {
  const navigate = useNavigate();

  const handleGerarAnimal = async () => {
  navigate('/cadastro-animais'); // Redireciona para a página de cadastro de animais
  };

  return (
    <div className="home-container">
      {/* Navbar mantendo a identidade visual */}
      <nav className="navbar">
        <h3 className="navbar-brand">AdotaIFPB</h3>
        <div className="navbar-links">
          <Link to="/home" className="nav-link">Início</Link>
          <Link to="/animais" className="nav-link nav-link-active">Animais</Link>
          <Link to="/usuarios" className="nav-link">Usuários</Link>
        </div>
        <button onClick={() => { localStorage.removeItem('usuario_autenticado'); navigate('/login'); }} className="btn-logout">
          Sair
        </button>
      </nav>

      {/* Conteúdo do Gerenciamento de Animais */}
      <div className="content-wrapper" style={{ textAlign: 'center' }}>
        <h1>Gerenciamento de Animais</h1>
        <p className="main-description">
          Pressione o botão abaixo para testar o envio de dados via Axios e persistir um novo registro na API.
        </p>
        
        <button 
          onClick={handleGerarAnimal} 
          style={{ padding: '15px 30px', backgroundColor: '#004c00', color: '#white', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '20px' }}
        >
          GERAR ANIMAL
        </button>
      </div>
    </div>
  );
}

export default Animais;