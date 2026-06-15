import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cadastrarAnimal } from '../services/animalService';
import '../styles/Home.css'; // Reaproveita os estilos da Navbar

function Animais() {
  const navigate = useNavigate();

  const handleGerarAnimal = async () => {
    // Dados fictícios estruturados exatamente como o seu AnimalRequestDTO espera
    const novoAnimalFake = {
      nome: "Rex Integrado",
      especieId: 1,  // Certifique-se de que o ID 1 existe no seu banco (ex: Cão)
      abrigoId: 1,   // Certifique-se de que o ID 1 existe no seu banco
      raca: "Vira-lata",
      idadeEstimada: 2,
      sexo: "M",
      descricao: "Animal gerado automaticamente através do clique no botão do React.",
      urlFoto: ""
    };

  try {
      // Dispara o evento do Axios para salvar no PostgreSQL
      const resultado = await cadastrarAnimal(novoAnimalFake);
      alert(`Sucesso! Animal "${resultado.nome}" foi cadastrado no banco com o ID: ${resultado.id}`);
    } catch (error) {
      alert("Falha ao salvar o animal. Verifique se o Back-end está rodando e se os IDs de espécie/abrigo existem.");
    }
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