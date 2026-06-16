import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { listarAnimais } from '../services/animalService';
import '../styles/Home.css'; 
import '../styles/Animais.css';

function Animais() {
  const navigate = useNavigate();
  const [animais, setAnimais] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Busca os animais assim que a tela carrega
  useEffect(() => {
    const carregarAnimais = async () => {
      try {
        setCarregando(true);
        const dados = await listarAnimais();
        setAnimais(dados);
      } catch (error) {
        console.error("Erro ao carregar animais:", error);
        setErro("Falha ao carregar os animais. Verifique se a API está online.");
      } finally {
        setCarregando(false);
      }
    };

    carregarAnimais();
  }, []);

  // Redireciona para uma futura tela de cadastro
  const handleNovoAnimal = () => {
    navigate('/cadastro-animais');
  };

  const handleLogout = () => {
    localStorage.removeItem('usuario_autenticado');
    navigate('/login');
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
        <button onClick={handleLogout} className="btn-logout">
          Sair
        </button>
      </nav>

      {/* Conteúdo Principal */}
      <div className="content-wrapper animais-content">
        <h1>Vitrine de Animais</h1>
        <p className="main-description">
          Acompanhe aqui os animais cadastrados no sistema do IFPB.
        </p>
        
        <button 
          onClick={handleNovoAnimal}
          className="btn-novo-animal"
        >
          NOVO ANIMAL
        </button>

        {/* Seção de Listagem (Tabela) */}
        <div className="animais-listagem-section">
          <h2>Lista de Animais</h2>
          
          {carregando && <p>Procurando animais nos abrigos...</p>}
          {erro && <p className="animais-erro">{erro}</p>}
          {!carregando && !erro && animais.length === 0 && <p>Nenhum animal cadastrado no momento.</p>}

          {!carregando && !erro && animais.length > 0 && (
            <div className="animais-table-wrapper">
              <table className="animais-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Espécie</th>
                    <th>Raça</th>
                    <th>Idade</th>
                    <th>Sexo</th>
                    <th>Abrigo</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {animais.map((animal) => (
                    <tr key={animal.id}>
                      <td className="animais-nome">{animal.nome}</td>
                      <td>{animal.especie?.nome || '-'}</td>
                      <td>{animal.raca || 'Sem raça definida'}</td>
                      <td>{animal.idadeEstimada ? `${animal.idadeEstimada} anos` : '-'}</td>
                      <td>{animal.sexo === 'M' ? 'Macho' : 'Fêmea'}</td>
                      <td>{animal.abrigo?.nome || '-'}</td>
                      <td>
                        <span className={`status-badge ${animal.status === 'DISPONIVEL' ? 'disponivel' : 'adotado'}`}>
                          {animal.status}
                        </span>
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

export default Animais;