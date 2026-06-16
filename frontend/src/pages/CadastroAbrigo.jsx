import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cadastrarAbrigo } from '../services/abrigoService';
import '../styles/Home.css';
import '../styles/CadastroAbrigo.css';

function CadastroAbrigo() {
  const navigate = useNavigate();
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);
  const [sucesso, setSucesso] = useState(false);

  const [formData, setFormData] = useState({
    nome: '',
    localizacao: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setErro(null);
    setSucesso(false);

    try {
      const dados = {
        nome: formData.nome,
        localizacao: formData.localizacao,
        telefone: formData.telefone,
        email: formData.email,
        capacidadeMaxima: parseInt(formData.capacidadeMaxima, 10) || 0,
        descricao: formData.descricao
      };

      await cadastrarAbrigo(dados);
      setSucesso(true);

      setTimeout(() => {
        navigate('/animais');
      }, 1500);
    } catch (error) {
      console.error("Erro ao cadastrar abrigo:", error);
      setErro(
        error.response?.data?.message ||
        "Erro ao cadastrar abrigo. Verifique os dados e tente novamente."
      );
    } finally {
      setCarregando(false);
    }
  };

  const handleVoltar = () => {
    navigate('/animais');
  };

  return (
    <div className="home-container cadastro-abrigo-page">
      <div className="cadastro-abrigo-container">
        <h1>Cadastro de Abrigo</h1>
        <p className="cadastro-abrigo-descricao">
          Preencha os campos abaixo para registrar um novo abrigo no sistema.
        </p>

        {sucesso && (
          <div className="cadastro-abrigo-sucesso">
            ✓ Abrigo cadastrado com sucesso! Redirecionando...
          </div>
        )}

        {erro && (
          <div className="cadastro-abrigo-erro">
            ✗ {erro}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nome">Nome do Abrigo *</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              placeholder="Ex: Abrigo dos Animais IFPB"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="localizacao">Localização *</label>
            <input
              type="text"
              id="localizacao"
              name="localizacao"
              value={formData.localizacao}
              onChange={handleInputChange}
              placeholder="Ex: Rua das Flores, 123, João Pessoa"
              required
            />
          </div>

          <div className="cadastro-abrigo-botoes">
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
          <p className="cadastro-abrigo-carregando">
            Processando cadastro...
          </p>
        )}
      </div>
    </div>
  );
}

export default CadastroAbrigo;
