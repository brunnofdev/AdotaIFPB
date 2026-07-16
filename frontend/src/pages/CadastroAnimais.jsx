import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cadastrarAnimal } from '../services/animalService';
import { listarAbrigos } from '../services/abrigoService';
import '../styles/CadastroAnimais.css';

const CadastroAnimais = () => {
  const navigate = useNavigate();
  const [carregando, setCarregando] = useState(false);
  const [carregandoAbrigos, setCarregandoAbrigos] = useState(true);
  const [erro, setErro] = useState(null);
  const [sucesso, setSucesso] = useState(false);
  const [abrigos, setAbrigos] = useState([]);

  const [formData, setFormData] = useState({
    nome: '',
    especie: '',
    abrigoId: '',
    raca: '',
    nascimentoEstimado: '',
    sexoAnimal: '',
    descricao: '',
    peso: '',
    castrado: false
  });

  const [arquivoFoto, setArquivoFoto] = useState(null);

  useEffect(() => {
    const carregarAbrigos = async () => {
      try {
        setCarregandoAbrigos(true);
        const dados = await listarAbrigos();
        setAbrigos(dados);
      } catch (error) {
        console.error("Erro ao carregar abrigos:", error);
        setErro("Erro ao carregar a lista de abrigos.");
      } finally {
        setCarregandoAbrigos(false);
      }
    };

    carregarAbrigos();
  }, []);

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

    const animalPayload = {
      nome: formData.nome,
      especie: formData.especie,
      abrigoId: Number(formData.abrigoId),
      raca: formData.raca,
      nascimentoEstimado: formData.nascimentoEstimado,
      sexoAnimal: formData.sexoAnimal,
      descricao: formData.descricao,
      peso: formData.peso ? parseFloat(formData.peso) : null,
      castrado: formData.castrado
    };


    const formDataToSend = new FormData();
    
    formDataToSend.append('animal', new Blob([JSON.stringify(animalPayload)], {
        type: "application/json"
    }));

    if (arquivoFoto) {
        formDataToSend.append('foto', arquivoFoto);
    }

    try {
      await cadastrarAnimal(formDataToSend);
      setSucesso(true);

      setTimeout(() => {
        navigate('/animais');
      }, 1500);
    }  catch (error) {
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
            <label htmlFor="abrigoId">Abrigo *</label>
            {carregandoAbrigos ? (
              <select id="abrigoId" disabled>
                <option value="">Carregando abrigos...</option>
              </select>
            ) : (
              <select
                id="abrigoId"
                name="abrigoId"
                value={formData.abrigoId}
                onChange={handleChange}
                required
              >
                <option value="">Selecione um abrigo...</option>
                {abrigos.map((abrigo) => (
                  <option key={abrigo.id} value={abrigo.id}>
                    {abrigo.nome}
                  </option>
                ))}
              </select>
            )}
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
          <label htmlFor="arquivoFoto">Foto do Animal</label>
          <input
            type="file"
            id="arquivoFoto"
            name="arquivoFoto"
            accept="image/*"
            onChange={(e) => setArquivoFoto(e.target.files[0])}
            required
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