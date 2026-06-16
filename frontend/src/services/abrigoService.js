import api from './api';

export const listarAbrigos = async () => {
  try {
    const response = await api.get('/abrigos');
    return response.data; // Retorna uma lista de AbrigoResponseDTO
  } catch (error) {
    console.error("Erro ao buscar abrigos:", error);
    throw error;
  }
};

export const cadastrarAbrigo = async (dadosAbrigo) => {
  try {
    const response = await api.post('/abrigos', dadosAbrigo);
    return response.data; // Retorna o AbrigoResponseDTO do abrigo criado
  } catch (error) {
    console.error("Erro ao cadastrar abrigo:", error);
    throw error;
  }
};