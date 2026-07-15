import {useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import '../styles/Home.css'; 
import { HomeNav } from '../components/HomeNav';

function Home() {

  const navigate = useNavigate();
  const handleCardClick = (animalId) => {
    navigate('/cadastrar-solicitacao', { state: { animalId } }); 
  }

  return (
    <div className="home-container">
      <HomeNav />

      <div className="content-wrapper">
        <div className="user-info">
          <p> O Brasik Junior </p>
        </div>
        <div className="adota-dashboard">
          <h1 className="main-title">Bem-vindo ao AdotaIFPB!</h1>
          <p className="dashboard-description">
            Gerencie animais, usuários e solicitações de adoção de forma eficiente.
          </p>

          <div className="card-section">
            <Card onClick={handleCardClick}/>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;