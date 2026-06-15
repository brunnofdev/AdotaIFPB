import api from './api';

// Função que envia a solicitação POST para o Spring Boot
export const cadastrarAnimal = async (dadosAnimal) => {
  try {
    const response = await api.post('/animais', dadosAnimal);
    return response.data; // Retorna o AnimalResponseDTO enviado pelo servidor
  } catch (error) {
    console.error("Erro ao integrar com a API de animais:", error);
    throw error;
  }
};