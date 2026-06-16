import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cadastrarUsuario } from '../services/userService';
import '../styles/Home.css';
import '../styles/CadastroAnimais.css';

const CadastroUsuarios = () => {
  const navigate = useNavigate();
  
  // O estado inicial deve refletir o corpo da requisição esperado pelo backend
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    vinculoIFPB: '',
    telefone: ''
  });

  const handleVoltar = () => {
    navigate('/animais');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita o recarregamento da página
    try {
      await cadastrarUsuario(formData);
      alert('Usuário cadastrado com sucesso!');
      navigate('/usuarios'); // Retorna para a lista de usuários após o sucesso
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
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
      <h2>Cadastrar Novo Usuário</h2>
      
      <form onSubmit={handleSubmit} className="animal-form">
        <div className="form-group">
          <label htmlFor="nome">Nome:</label>
          <input 
            type="text" 
            id="nome" 
            name="nome" 
            value={formData.nome} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="senha">Senha:</label>
          <input 
            type="password" 
            id="senha" 
            name="senha" 
            value={formData.senha} 
            onChange={handleChange} 
            required 
            minLength="6"
          />
        </div>

        <div className="form-group">
          <label htmlFor="vinculoIFPB">Vínculo com IFPB:</label>
          <select 
            id="vinculoIFPB" 
            name="vinculoIFPB" 
            value={formData.vinculoIFPB} 
            onChange={handleChange} 
            required
          >
            <option value="">Selecione...</option>
            <option value="ALUNO">Aluno</option>
            <option value="SERVIDOR">Servidor</option>
            <option value="TERCEIRIZADO">Terceirizado</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="telefone">Telefone:</label>
          <input 
            type="tel" 
            id="telefone" 
            name="telefone" 
            value={formData.telefone} 
            onChange={handleChange}
            placeholder="(XX) XXXXX-XXXX"
          />
        </div>

        {/* Botão SEND final para submeter o form */}
        <button type="submit" className="btn-send">SEND</button>
                           <button
              type="button"
              className="btn-voltar"
              onClick={handleVoltar}
            >
              VOLTAR
            </button>
      </form>
    </div>
  );
};

export default CadastroUsuarios;
