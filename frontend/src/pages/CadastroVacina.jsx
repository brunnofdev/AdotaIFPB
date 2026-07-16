import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cadastrarVacina } from '../services/vacinaService';
import '../styles/Home.css';
import '../styles/CadastroAbrigo.css';

function CadastroVacina() {
  const navigate = useNavigate();
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);
  const [sucesso, setSucesso] = useState(false);

  const [formData, setFormData] = useState({
    nome: '',
    fabricante: '',
    descricao: '',
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
        fabricante: formData.fabricante,
        descricao: formData.descricao,
      };

      await cadastrarVacina(dados);
      setSucesso(true);

      setTimeout(() => {
        navigate('/animais');
      }, 1500);
    } catch (error) {
      console.error("Erro ao cadastrar vacina:", error);
      setErro(
        error.response?.data?.message ||
        "Erro ao cadastrar vacina. Verifique os dados e tente novamente."
      );
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
        <h1>Cadastro de Vacina</h1>
        <p className="cadastro-abrigo-descricao">
          Preencha os campos abaixo para registrar uma nova vacina no sistema.
        </p>

        {sucesso && (
          <div className="cadastro-abrigo-sucesso">
            ✓ Vacina cadastrada com sucesso! Redirecionando...
          </div>
        )}

        {erro && (
          <div className="cadastro-abrigo-erro">
            ✗ {erro}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nome">Nome da Vacina *</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              placeholder="Ex: Raiva, Tétano, Parvovírus"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="fabricante">Fabricante</label>
            <input
              type="text"
              id="fabricante"
              name="fabricante"
              value={formData.fabricante}
              onChange={handleInputChange}
              placeholder="Ex: Merial, Boehringer Ingelheim"
            />
          </div>

          <div className="form-group">
            <label htmlFor="descricao">Descrição</label>
            <textarea
              id="descricao"
              name="descricao"
              value={formData.descricao}
              onChange={handleInputChange}
              placeholder="Ex: Descrição ou detalhes adicionais sobre a vacina"
              style={{
                width: '380px',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '14px',
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                minHeight: '100px',
                resize: 'vertical'
              }}
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

export default CadastroVacina;
