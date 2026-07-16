import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cadastrarAbrigo } from '../services/abrigoService';
import toast from 'react-hot-toast';
import '../styles/Home.css';
import '../styles/CadastroAbrigo.css';

function CadastroAbrigo() {
  const navigate = useNavigate();
  const [carregando, setCarregando] = useState(false);

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

    if (!formData.nome.trim() || !formData.localizacao.trim()) {
      toast.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setCarregando(true);

    try {
      const dados = {
        nome: formData.nome,
        localizacao: formData.localizacao,
      };

      await cadastrarAbrigo(dados);
      toast.success('Abrigo cadastrado com sucesso! Redirecionando...');

      setTimeout(() => {
        navigate('/animais');
      }, 1500);
    } catch (error) {
      console.error("Erro ao cadastrar abrigo:", error);
      const errorMsg = error.response?.data?.message ||
        "Erro ao cadastrar abrigo. Verifique os dados e tente novamente.";
      toast.error(errorMsg);
    } finally {
      setCarregando(false);
    }
  };

  const handleVoltar = () => {
    navigate('/animais');
  };

  return (
    <div className="home-container form-container">
      <div className="cadastro-abrigo-container">
        <h1>Cadastro de Abrigo</h1>
        <p className="cadastro-abrigo-descricao">
          Preencha os campos abaixo para registrar um novo abrigo no sistema.
        </p>

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
