import api from './api';

export const cadastrarAnimal = async (dadosAnimal) => {
  try {
    const response = await api.post('/animais', dadosAnimal);
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar animal:", error);
    throw error;
  }
};

export const listarAnimais = async () => {
  try {
    const response = await api.get('/animais');
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar animais:", error);
    throw error;
  }
};

export const buscarAnimalPorId = async (id) => {
  try {
    const response = await api.get(`/animais/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar o animal com ID ${id}:`, error);
    throw error;
  }
};

export const atualizarAnimal = async (id, dadosAnimal) => {
  try {
    const response = await api.put(`/animais/${id}`, dadosAnimal);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar o animal com ID ${id}:`, error);
    throw error;
  }
};

export const removerAnimal = async (id) => {
  try {
    const response = await api.delete(`/animais/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao remover o animal com ID ${id}:`, error);
    throw error;
  }
};