import api from './api';

export const listarAdocoes = async () => {
  try {
    const response = await api.get('/adocoes');
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar histórico de adoções:", error);
    throw error;
  }
};

export const cadastrarAdocao = async (dadosAdocao) => {
  try {
    const response = await api.post('/adocoes', dadosAdocao);
    return response.data;
  } catch (error) {
    console.error("Erro ao registrar adoção:", error);
    throw error;
  }
};

// Soft Delete
export const cancelarAdocao = async (id) => {
  try {
    const response = await api.delete(`/adocoes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao cancelar a adoção:", error);
    throw error;
  }
};