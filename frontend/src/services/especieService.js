import api from './api';

export const listarEspecies = async () => {
  try {
    const response = await api.get('/especies');
    return response.data; // Retorna uma lista de EspecieResponseDTO
  } catch (error) {
    console.error("Erro ao buscar espécies:", error);
    throw error;
  }
};

export const cadastrarEspecie = async (dadosEspecie) => {
  try {
    const response = await api.post('/especies', dadosEspecie);
    return response.data; // Retorna a EspecieResponseDTO da espécie criada
  } catch (error) {
    console.error("Erro ao cadastrar espécie:", error);
    throw error;
  }
};