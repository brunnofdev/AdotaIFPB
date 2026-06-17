import api from './api';

export const listarSolicitacoes = async () => {
  try {
    const response = await api.get('/solicitacoes');
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar solicitações:", error);
    throw error;
  }
};

// POST para o clientside
export const cadastrarSolicitacao = async (dadosSolicitacao) => {
  try {
    const response = await api.post('/solicitacoes', dadosSolicitacao);
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar solicitação:", error);
    throw error;
  }
};