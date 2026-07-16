import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { buscarAnimalPorId, atualizarAnimal, removerAnimal } from '../services/animalService';
import { listarAbrigos } from '../services/abrigoService';
import { listarVacinas, registrarVacinacao } from '../services/vacinaService';
import '../styles/CadastroAnimais.css';

const EditarAnimal = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [carregando, setCarregando] = useState(true);
  const [carregandoAbrigos, setCarregandoAbrigos] = useState(true);
  const [carregandoVacinas, setCarregandoVacinas] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState(null);
  const [sucesso, setSucesso] = useState(false);
  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [abrigos, setAbrigos] = useState([]);
  const [vacinas, setVacinas] = useState([]);
  const [erroVacinacao, setErroVacinacao] = useState(null);
  const [sucessoVacinacao, setSucessoVacinacao] = useState(false);

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

  const [formVacinacao, setFormVacinacao] = useState({
    vacinaId: '',
    dataAplicacao: '',
    proximaDose: '',
    observacoes: ''
  });

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setCarregando(true);
        setErro(null);
        const animal = await buscarAnimalPorId(id);

        setFormData({
          nome: animal.nome || '',
          especie: animal.especie || '',
          abrigoId: animal.abrigo?.id || '',
          raca: animal.raca || '',
          nascimentoEstimado: animal.nascimentoEstimado || '',
          sexoAnimal: animal.sexoAnimal || '',
          descricao: animal.descricao || '',
          peso: animal.peso || '',
          castrado: animal.castrado || false
        });
      } catch (error) {
        console.error("Erro ao carregar animal:", error);
        setErro("Erro ao carregar os dados do animal. Tente novamente.");
      } finally {
        setCarregando(false);
      }
    };

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

    const carregarVacinas = async () => {
      try {
        setCarregandoVacinas(true);
        const dados = await listarVacinas();
        setVacinas(dados);
      } catch (error) {
        console.error("Erro ao carregar vacinas:", error);
        setErro("Erro ao carregar a lista de vacinas.");
      } finally {
        setCarregandoVacinas(false);
      }
    };

    carregarDados();
    carregarAbrigos();
    carregarVacinas();
  }, [id]);

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
    setEnviando(true);
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
      await atualizarAnimal(id, formDataToSend);
      setSucesso(true);
      setMensagemSucesso('Animal atualizado com sucesso! Redirecionando...');

      setTimeout(() => {
        navigate('/animais');
      }, 1500);
    } catch (error) {
      console.error("Erro ao atualizar animal:", error);
      const backendError = error.response?.data;
      let errorMsg = "Erro ao atualizar animal. Verifique os dados.";

      if (backendError && typeof backendError === 'object') {
        errorMsg = Object.values(backendError)[0];
      }

      setErro(errorMsg);
    } finally {
      setEnviando(false);
    }
  };

  const handleRemover = async () => {
    const confirmar = window.confirm(
      `Deseja realmente remover o animal "${formData.nome}"? Esta ação não pode ser desfeita.`
    );
    if (!confirmar) return;

    setEnviando(true);
    setErro(null);

    try {
      await removerAnimal(id);
      setSucesso(true);
      setMensagemSucesso('Animal removido com sucesso! Redirecionando...');

      setTimeout(() => {
        navigate('/animais');
      }, 1500);
    } catch (error) {
      console.error("Erro ao remover animal:", error);
      setErro("Erro ao remover o animal. Tente novamente.");
    } finally {
      setEnviando(false);
    }
  };

  const handleChangeVacinacao = (e) => {
    const { name, value } = e.target;
    setFormVacinacao((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAdicionarVacinacao = async (e) => {
    e.preventDefault();
    setErroVacinacao(null);
    setSucessoVacinacao(false);

    if (!formVacinacao.vacinaId || !formVacinacao.dataAplicacao) {
      setErroVacinacao('Vacina e data de aplicação são obrigatórios.');
      return;
    }

    const vacinacaoPayload = {
      animalId: Number(id),
      vacinaId: Number(formVacinacao.vacinaId),
      dataAplicacao: formVacinacao.dataAplicacao,
      proximaDose: formVacinacao.proximaDose || null,
      observacoes: formVacinacao.observacoes || null
    };

    try {
      await registrarVacinacao(vacinacaoPayload);
      setSucessoVacinacao(true);
      setFormVacinacao({
        vacinaId: '',
        dataAplicacao: '',
        proximaDose: '',
        observacoes: ''
      });

      setTimeout(() => setSucessoVacinacao(false), 3000);
    } catch (error) {
      console.error("Erro ao registrar vacinação:", error);
      const backendError = error.response?.data;
      let errorMsg = "Erro ao registrar vacinação. Tente novamente.";

      if (backendError && typeof backendError === 'object') {
        errorMsg = Object.values(backendError)[0] || errorMsg;
      }

      setErroVacinacao(errorMsg);
    }
  };

  if (carregando) {
    return (
      <div className="cadastro-animal-page">
        <div className="cadastro-animal-container">
          <p className="cadastro-animal-carregando">Carregando dados do animal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cadastro-animal-page">
      <div className="cadastro-animal-container">
        <h1>Editar Animal</h1>
        <p className="cadastro-animal-descricao">
          Atualize os dados do animal ou remova-o do sistema.
        </p>

        {sucesso && (
          <div className="cadastro-animal-sucesso">
            ✓ {mensagemSucesso}
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
              disabled={enviando}
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
              disabled={enviando}
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
              disabled={enviando}
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
              disabled={enviando}
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
              disabled={enviando}
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
              disabled={enviando}
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
                disabled={enviando}
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
                disabled={enviando}
              />
              O animal é castrado?
            </label>
          </div>

          <div className="form-group">
            <h3>Vacinação do Animal</h3>
            
            {sucessoVacinacao && (
              <div className="cadastro-animal-sucesso">
                ✓ Vacinação registrada com sucesso!
              </div>
            )}

            {erroVacinacao && (
              <div className="cadastro-animal-erro">
                ✗ {erroVacinacao}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="vacinaId">Escolher Vacina *</label>
              {carregandoVacinas ? (
                <select id="vacinaId" disabled>
                  <option value="">Carregando vacinas...</option>
                </select>
              ) : (
                <select
                  id="vacinaId"
                  name="vacinaId"
                  value={formVacinacao.vacinaId}
                  onChange={handleChangeVacinacao}
                  disabled={enviando}
                >
                  <option value="">Selecione uma vacina...</option>
                  {vacinas.map((vacina) => (
                    <option key={vacina.id} value={vacina.id}>
                      {vacina.nome}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="dataAplicacao">Data de Aplicação *</label>
              <input
                type="date"
                id="dataAplicacao"
                name="dataAplicacao"
                value={formVacinacao.dataAplicacao}
                onChange={handleChangeVacinacao}
                disabled={enviando}
              />
            </div>

            <div className="form-group">
              <label htmlFor="proximaDose">Próxima Dose</label>
              <input
                type="date"
                id="proximaDose"
                name="proximaDose"
                value={formVacinacao.proximaDose}
                onChange={handleChangeVacinacao}
                disabled={enviando}
              />
            </div>

            <div className="form-group">
              <label htmlFor="observacoes">Observações</label>
              <textarea
                id="observacoes"
                name="observacoes"
                value={formVacinacao.observacoes}
                onChange={handleChangeVacinacao}
                placeholder="Ex: Reação leve, animal apresentou febre..."
                disabled={enviando}
              />
            </div>

            <button
              type="button"
              className="btn-adicionar"
              onClick={handleAdicionarVacinacao}
              disabled={enviando}
            >
              {enviando ? 'Adicionando...' : 'ADICIONAR VACINAÇÃO'}
            </button>
          </div>

          <div className="form-group">
            <label htmlFor="arquivoFoto">Foto do Animal</label>
            <input
              type="file"
              id="arquivoFoto"
              name="arquivoFoto"
              accept="image/*"
              onChange={(e) => setArquivoFoto(e.target.files[0])}
              disabled={enviando}
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
              disabled={enviando}
            />
          </div>

          <div className="cadastro-animal-botoes">
            <button
              type="submit"
              className="btn-cadastrar"
              disabled={enviando}
            >
              {enviando ? 'Atualizando...' : 'ATUALIZAR'}
            </button>
            <button
              type="button"
              className="btn-voltar"
              onClick={handleVoltar}
              disabled={enviando}
            >
              VOLTAR
            </button>
            <button
              type="button"
              className="btn-remover"
              onClick={handleRemover}
              disabled={enviando}
            >
              {enviando ? 'Removendo...' : 'REMOVER'}
            </button>
          </div>
        </form>

        {enviando && (
          <p className="cadastro-animal-carregando">
            Processando solicitação...
          </p>
        )}
      </div>
    </div>
  );
};

export default EditarAnimal;
