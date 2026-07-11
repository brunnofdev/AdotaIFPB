import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cadastrarAnimal } from '../services/animalService';
import '../styles/CadastroAnimais.css';

const CadastroAnimais = () => {
  const navigate = useNavigate();
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);
  const [sucesso, setSucesso] = useState(false);

  const [formData, setFormData] = useState({
    nome: '',
    especie: '',
    abrigoId: '',
    raca: '',
    nascimentoEstimado: '',
    sexoAnimal: '',
    descricao: '',
    peso: '',
    castrado: false,
    fotoUrl: ''
  });

  const handleVoltar = () => {
    navigate('/animais');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setErro(null);
    setSucesso(false);

    const payload = {
      nome: formData.nome,
      especie: formData.especie,
      abrigoId: Number(formData.abrigoId),
      raca: formData.raca,
      nascimentoEstimado: formData.nascimentoEstimado,
      sexoAnimal: formData.sexoAnimal,
      descricao: formData.descricao,
      peso: formData.peso ? parseFloat(formData.peso) : null,
      castrado: formData.castrado,
      fotosUrls: formData.fotoUrl ? [formData.fotoUrl] : []
    };

    try {
      await cadastrarAnimal(payload);
      setSucesso(true);

      setTimeout(() => {
        navigate('/animais');
      }, 1500);
    } catch (error) {
      console.error("Erro ao cadastrar animal:", error);
      const backendError = error.response?.data;
      let errorMsg = "Erro ao cadastrar animal. Verifique os dados.";

      if (backendError && typeof backendError === 'object') {
        errorMsg = Object.values(backendError)[0];
      }

      setErro(errorMsg);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="cadastro-animal-page">
      <div className="cadastro-animal-container">
        <h1>Cadastrar Novo Animal</h1>
        <p className="cadastro-animal-descricao">
          Preencha os campos abaixo para cadastrar um novo animal.
        </p>

        {sucesso && (
          <div className="cadastro-animal-sucesso">
            ✓ Animal cadastrado com sucesso! Redirecionando...
          </div>
        )}

        {erro && (
          <div className="cadastro-animal-erro">
            ✗ {erro}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nome">Nome do Animal *</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Ex: Max"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="especie">Espécie *</label>
            <select
              id="especie"
              name="especie"
              value={formData.especie}
              onChange={handleChange}
              required
            >
              <option value="">Selecione...</option>
              <option value="CACHORRO">Cachorro</option>
              <option value="GATO">Gato</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="sexoAnimal">Sexo *</label>
            <select
              id="sexoAnimal"
              name="sexoAnimal"
              value={formData.sexoAnimal}
              onChange={handleChange}
              required
            >
              <option value="">Selecione...</option>
              <option value="MACHO">Macho</option>
              <option value="FEMEA">Fêmea</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="raca">Raça</label>
            <input
              type="text"
              id="raca"
              name="raca"
              value={formData.raca}
              onChange={handleChange}
              placeholder="Ex: Labrador"
            />
          </div>

          <div className="form-group">
            <label htmlFor="peso">Peso (kg)</label>
            <input
              type="number"
              step="0.1"
              id="peso"
              name="peso"
              value={formData.peso}
              onChange={handleChange}
              placeholder="Ex: 4.5"
            />
          </div>

          <div className="form-group">
            <label htmlFor="nascimentoEstimado">Nascimento Estimado</label>
            <input
              type="month"
              id="nascimentoEstimado"
              name="nascimentoEstimado"
              value={formData.nascimentoEstimado}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="abrigoId">ID do Abrigo *</label>
            <input
              type="number"
              id="abrigoId"
              name="abrigoId"
              value={formData.abrigoId}
              onChange={handleChange}
              placeholder="Ex: 1"
              required
            />
          </div>

          <div className="form-group checkbox-group">
            <label htmlFor="castrado" className="checkbox-label">
              <input
                type="checkbox"
                id="castrado"
                name="castrado"
                checked={formData.castrado}
                onChange={handleChange}
              />
              O animal é castrado?
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="fotoUrl">URL da Foto Principal</label>
            <input
              type="url"
              id="fotoUrl"
              name="fotoUrl"
              value={formData.fotoUrl}
              onChange={handleChange}
              placeholder="https://exemplo.com/foto.jpg"
            />
          </div>

          <div className="form-group">
            <label htmlFor="descricao">Descrição *</label>
            <textarea
              id="descricao"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              placeholder="Ex: Animal dócil e amigável..."
              required
            />
          </div>

          <div className="cadastro-animal-botoes">
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
          <p className="cadastro-animal-carregando">
            Processando cadastro...
          </p>
        )}
      </div>
    </div>
  );
};

export default CadastroAnimais;