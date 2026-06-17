import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cadastrarUsuario } from '../services/userService';
import '../styles/Home.css';
import '../styles/CadastroUsuarios.css';

const CadastroUsuarios = () => {
  const navigate = useNavigate();
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);
  const [sucesso, setSucesso] = useState(false);
  
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    vinculoIFPB: '',
    telefone: ''
  });

  const handleVoltar = () => {
    navigate('/usuarios');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setErro(null);
    setSucesso(false);

    try {
      await cadastrarUsuario(formData);
      setSucesso(true);

      setTimeout(() => {
        navigate('/usuarios');
      }, 1500);
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      setErro(
        error.response?.data?.message ||
        "Erro ao cadastrar usuário. Verifique os dados e tente novamente."
      );
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="home-container cadastro-usuario-page">
      <div className="cadastro-usuario-container">
        <h1>Cadastro de Usuário</h1>
        <p className="cadastro-usuario-descricao">
          Preencha os campos abaixo para registrar um novo usuário no sistema.
        </p>

        {sucesso && (
          <div className="cadastro-usuario-sucesso">
            ✓ Usuário cadastrado com sucesso! Redirecionando...
          </div>
        )}

        {erro && (
          <div className="cadastro-usuario-erro">
            ✗ {erro}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nome">Nome *</label>
            <input 
              type="text" 
              id="nome" 
              name="nome" 
              value={formData.nome} 
              onChange={handleChange}
              placeholder="Ex: João Silva"
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange}
              placeholder="Ex: joao@example.com"
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha *</label>
            <input 
              type="password" 
              id="senha" 
              name="senha" 
              value={formData.senha} 
              onChange={handleChange}
              placeholder="Mínimo 6 caracteres"
              required 
              minLength="6"
            />
          </div>

          <div className="form-group">
            <label htmlFor="vinculoIFPB">Vínculo com IFPB *</label>
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
            <label htmlFor="telefone">Telefone</label>
            <input 
              type="tel" 
              id="telefone" 
              name="telefone" 
              value={formData.telefone} 
              onChange={handleChange}
              placeholder="(XX) XXXXX-XXXX"
            />
          </div>

          <div className="cadastro-usuario-botoes">
            <button 
              type="submit" 
              className="btn-cadastrar"
              disabled={carregando}
            >
              {carregando ? 'Cadastrando...' : 'CADASTRAR'}
            </button>
            <button
              type="button"
              className="btn-voltar"
              onClick={handleVoltar}
              disabled={carregando}
            >
              VOLTAR
            </button>
          </div>
        </form>

        {carregando && (
          <p className="cadastro-usuario-carregando">
            Processando cadastro...
          </p>
        )}
      </div>
    </div>
  );
};

export default CadastroUsuarios;
