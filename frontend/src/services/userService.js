import api from './api';

// Função que envia a solicitação POST para o Spring Boot
export const cadastrarUsuario = async (dadosUsuario) => {
  try {
    const response = await api.post('/usuarios', dadosUsuario);
    return response.data; // Retorna o UsuarioResponseDTO
  } catch (error) {
    console.error("Erro ao integrar com a API de usuários:", error);
    throw error;
  }
};

// Função que busca todos os usuários
export const listarUsuarios = async () => {
  try {
    const response = await api.get('/usuarios');
    return response.data; // Retorna lista de UsuarioResponseDTO
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    throw error;
  }
};

// Função que busca usuário por ID
export const buscarUsuarioPorId = async (id) => {
  try {
    const response = await api.get(`/usuarios/${id}`);
    return response.data; // Retorna UsuarioResponseDTO
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    throw error;
  }
};

// Função que atualiza um usuário
export const atualizarUsuario = async (id, dadosUsuario) => {
  try {
    const response = await api.put(`/usuarios/${id}`, dadosUsuario);
    return response.data; // Retorna UsuarioResponseDTO atualizado
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    throw error;
  }
};

// Função que remove um usuário
export const removerUsuario = async (id) => {
  try {
    const response = await api.delete(`/usuarios/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao remover usuário:", error);
    throw error;
  }
};
