import api from './api';

export const listarVacinas = async () => {
  try {
    const response = await api.get('/vacinas');
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar vacinas:", error);
    throw error;
  }
};

export const buscarVacinaPorId = async (id) => {
  try {
    const response = await api.get(`/vacinas/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar vacina:", error);
    throw error;
  }
};

export const cadastrarVacina = async (dadosVacina) => {
  try {
    const response = await api.post('/vacinas', dadosVacina);
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar vacina:", error);
    throw error;
  }
};

export const atualizarVacina = async (id, dadosVacina) => {
  try {
    const response = await api.put(`/vacinas/${id}`, dadosVacina);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar vacina:", error);
    throw error;
  }
};

export const inativarVacina = async (id) => {
  try {
    const response = await api.delete(`/vacinas/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao inativar vacina:", error);
    throw error;
  }
};

export const registrarVacinacao = async (dadosVacinacao) => {
  try {
    const response = await api.post('/vacinacoes', dadosVacinacao);
    return response.data;
  } catch (error) {
    console.error("Erro ao registrar vacinação:", error);
    throw error;
  }
};
