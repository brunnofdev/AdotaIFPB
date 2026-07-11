import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
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

  const handleCardClick = () => {
    navigate('/login');
  }

  return (
    <div className="home-container">
      <nav className="side-navbar">
      <h3 className="side-navbar-brand">AdotaIFPB</h3>
        <div className="side-navbar-links">
          <Link to="/home" className="side-nav-link side-nav-link-active">Início</Link>
          <Link to="/animais" className="side-nav-link">Animais</Link>
          <Link to="/usuarios" className="side-nav-link">Usuários</Link>
          <Link to="/solicitacoes" className="side-nav-link">Adoções</Link>
        </div>
        <button className="logout-button" onClick={handleLogout}>Sair</button>
      </nav>

      <div className="content-wrapper">
        <div className="user-info">
          <p> O Brasik Junior </p>
        </div>
        <div className="adota-dashboard">
          <h1 className="main-title">Bem-vindo ao AdotaIFPB!</h1>
          <p className="dashboard-description">
            Gerencie animais, usuários e solicitações de adoção de forma eficiente.
          </p>

          <div className="grid">
            < Card title="Tom" description="Gato" onClick={handleCardClick}/>
            < Card title="Ben" description="Cachorro" onClick={handleCardClick}/>
            < Card title="Tom" description="Pássaro" onClick={handleCardClick}/>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;