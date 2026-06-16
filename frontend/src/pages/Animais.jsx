import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { listarAnimais } from '../services/animalService';
import '../styles/Home.css'; 

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
      <div className="content-wrapper" style={{ textAlign: 'center' }}>
        <h1>Vitrine de Animais</h1>
        <p className="main-description">
          Acompanhe aqui os animais cadastrados no sistema do IFPB.
        </p>
        
        <button 
          onClick={handleNovoAnimal} 
          style={{ padding: '15px 30px', backgroundColor: '#004c00', color: 'white', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '20px' }}
        >
          NOVO ANIMAL
        </button>

        {/* Seção de Listagem (Tabela) */}
        <div style={{ marginTop: '40px', textAlign: 'left' }}>
          <h2>Lista de Animais</h2>
          
          {/* Tratamento de Estados da Tela */}
          {carregando && <p>Procurando animais nos abrigos...</p>}
          {erro && <p style={{ color: 'red' }}>{erro}</p>}
          {!carregando && !erro && animais.length === 0 && <p>Nenhum animal cadastrado no momento.</p>}

          {!carregando && !erro && animais.length > 0 && (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f0f0f0', borderBottom: '2px solid #004c00' }}>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Nome</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Espécie</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Raça</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Idade</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Sexo</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Abrigo</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {animais.map((animal) => (
                    <tr key={animal.id} style={{ borderBottom: '1px solid #ddd' }}>
                      <td style={{ padding: '10px', fontWeight: 'bold' }}>{animal.nome}</td>
                      {/* Usando Optional Chaining caso a Espécie ou Abrigo venham nulos */}
                      <td style={{ padding: '10px' }}>{animal.especie?.nome || '-'}</td>
                      <td style={{ padding: '10px' }}>{animal.raca || 'Sem raça definida'}</td>
                      <td style={{ padding: '10px' }}>{animal.idadeEstimada ? `${animal.idadeEstimada} anos` : '-'}</td>
                      <td style={{ padding: '10px' }}>{animal.sexo === 'M' ? 'Macho' : 'Fêmea'}</td>
                      <td style={{ padding: '10px' }}>{animal.abrigo?.nome || '-'}</td>
                      <td style={{ padding: '10px' }}>
                        {/* Dá uma cor diferente se o status for DISPONIVEL ou ADOTADO */}
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          backgroundColor: animal.status === 'DISPONIVEL' ? '#e6ffe6' : '#ffe6e6',
                          color: animal.status === 'DISPONIVEL' ? '#004c00' : '#cc0000',
                          fontWeight: 'bold',
                          fontSize: '12px'
                        }}>
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