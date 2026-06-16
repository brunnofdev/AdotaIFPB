import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cadastrarAnimal } from '../services/animalService';
import '../styles/Home.css'; // ou o CSS de sua preferência para a tela
import '../styles/CadastroAnimais.css'; // Estilos específicos para o cadastro de animais

const CadastroAnimais = () => {
  const navigate = useNavigate();
  
  // O estado inicial deve refletir o corpo da requisição esperado pelo backend
  const [formData, setFormData] = useState({
    nome: '',
    raca: '',
    idade: null,
    sexo: '',
    descricao: '',
    especieId: '' // Caso o animal tenha relação com a entidade Especie
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita o recarregamento da página
    try {
      await cadastrarAnimal(formData);
      alert('Animal cadastrado com sucesso!');
      navigate('/animais'); // Retorna para a lista de animais após o sucesso
    } catch (error) {
      console.error("Erro ao cadastrar animal:", error);
      alert('Falha ao enviar os dados. Verifique a conexão com a API.');
    }
  };

  return (
    <div className="cadastro-container">
      <nav className="navbar">
        <h3 className="navbar-brand">AdotaIFPB</h3>
        <div className="navbar-links">
          <button onClick={() => { localStorage.removeItem('usuario_autenticado'); navigate('/login'); }} className="btn-logout">
            Sair
          </button>
        </div>
       
      </nav>
      <h2>Cadastrar Novo Animal</h2>
      
      <form onSubmit={handleSubmit} className="animal-form">
        <div className="form-group">
          <label htmlFor="nome">Nome:</label>
          <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="especieId">Espécie ID:</label>
          <input type="number" id="especieId" name="especieId" value={formData.especieId} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="abrigoId">Abrigo ID:</label>
          <input type="number" id="abrigoId" name="abrigoId" value={formData.abrigoId} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="raca">Raça:</label>
          <input type="text" id="raca" name="raca" value={formData.raca} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="idade">Idade:</label>
          <input type="number" id="idade" name="idade" value={formData.idade} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="sexo">Sexo:</label>
          <select id="sexo" name="sexo" value={formData.sexo} onChange={handleChange} required>
            <option value="">Selecione...</option>
            <option value="M">Macho</option>
            <option value="F">Fêmea</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="descricao">Descrição:</label>
          <textarea id="descricao" name="descricao" value={formData.descricao} onChange={handleChange} required />
        </div>

        {/* Botão SEND final para submeter o form */}
        <button type="submit" className="btn-send">SEND</button>
      </form>
    </div>
  );
};

export default CadastroAnimais;