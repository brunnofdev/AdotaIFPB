import api from './api';

export const cadastrarAnimal = async (formData) => {
  try {
    
    const response = await api.post('/animais', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
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

export const atualizarAnimal = async (id, formData) => {
  try {
    const response = await api.put(`/animais/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar o animal:", error);
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