import api from './api';

export const listarAbrigos = async () => {
  try {
    const response = await api.get('/abrigos');
    return response.data; 
  } catch (error) {
    console.error("Erro ao buscar abrigos:", error);
    throw error;
  }
};

export const buscarAbrigoPorId = async (id) => {
  try {
    const response = await api.get(`/abrigos/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar abrigo:", error);
    throw error;
  }
};

export const cadastrarAbrigo = async (dadosAbrigo) => {
  try {
    const response = await api.post('/abrigos', dadosAbrigo);
    return response.data; 
  } catch (error) {
    console.error("Erro ao cadastrar abrigo:", error);
    throw error;
  }
};

export const atualizarAbrigo = async (id, dadosAbrigo) => {
  try {
    const response = await api.put(`/abrigos/${id}`, dadosAbrigo);
    return response.data; 
  } catch (error) {
    console.error("Erro ao atualizar abrigo:", error);
    throw error;
  }
};

export const removerAbrigo = async (id) => {
  try {
    const response = await api.delete(`/abrigos/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao remover abrigo:", error);
    throw error;
  }
};