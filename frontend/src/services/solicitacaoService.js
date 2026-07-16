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

export const buscarSolicitacaoPorId = async (id) => {
  try {
    const response = await api.get(`/solicitacoes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar solicitação:", error);
    throw error;
  }
};

export const cadastrarSolicitacao = async (dadosSolicitacao) => {
  try {
    const response = await api.post('/solicitacoes', dadosSolicitacao);
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar solicitação:", error);
    throw error;
  }
};

export const atualizarStatusSolicitacao = async (id, status) => {
  try {
    const response = await api.post(`/solicitacoes/${id}/aprovar`, { status });
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar status da solicitação:", error);
    throw error;
  }
};

export const aprovarSolicitacao = async (id) => {
  try {
    const response = await api.post(`/solicitacoes/${id}/aprovar`);
    return response.data;
  } catch (error) {
    console.error("Erro ao aprovar solicitação:", error);
    throw error;
  }
};

export const cancelarSolicitacao = async (id) => {
  try {
    const response = await api.patch(`/solicitacoes/${id}/cancelar`);
    return response.data;
  } catch (error) {
    console.error("Erro ao cancelar solicitação:", error);
    throw error;
  }
};