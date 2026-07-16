import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cadastrarUsuario } from '../services/userService';
import toast from 'react-hot-toast';
import '../styles/CadastroUsuarios.css';

const CadastroUsuarios = () => {
  const navigate = useNavigate();
  const [carregando, setCarregando] = useState(false);

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    senhaConfirmacao: '', 
    vinculoIFPB: '',
    telefone: ''
  });

  const handleVoltar = () => {
    // modificar futuramente para redirecionar para a página se tiver logad oou não
    navigate('/usuarios');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nome.trim() || !formData.email.trim() || !formData.senha.trim() || 
        !formData.senhaConfirmacao.trim() || !formData.vinculoIFPB.trim()) {
      toast.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (formData.senha.length < 6) {
      toast.error('A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    if (formData.senha !== formData.senhaConfirmacao) {
      toast.error('As senhas não coincidem. Verifique e tente novamente.');
      return;
    }

    setCarregando(true);

    try {
      await cadastrarUsuario(formData);
      toast.success('Usuário cadastrado com sucesso! Redirecionando...');

      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      const backendError = error.response?.data;
      let errorMsg = "Erro ao cadastrar usuário. Verifique os dados.";
      
      if (backendError && typeof backendError === 'object') {
         errorMsg = Object.values(backendError)[0]; 
      }

      toast.error(errorMsg);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="cadastro-usuario-page">
      <div className="cadastro-usuario-container">
        <h1>Criar Conta</h1>
        <p className="cadastro-usuario-descricao">
          Preencha os campos abaixo para se registrar no sistema.
        </p>


        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nome">Nome Completo *</label>
            <input 
              type="text" 
              id="nome" 
              name="nome" 
              value={formData.nome} 
              onChange={handleChange}
              placeholder="Ex: João Silva"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Institucional *</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange}
              placeholder="Ex: joao@academico.ifpb.edu.br"
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha *</label>
            <input 
              type="password" 
              id="senha" 
              name="senha" 
              value={formData.senha} 
              onChange={handleChange}
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          <div className="form-group">
            <label htmlFor="senhaConfirmacao">Confirmar Senha *</label>
            <input 
              type="password" 
              id="senhaConfirmacao" 
              name="senhaConfirmacao" 
              value={formData.senhaConfirmacao} 
              onChange={handleChange}
              placeholder="Digite a senha novamente"
            />
          </div>

          <div className="form-group">
            <label htmlFor="vinculoIFPB">Vínculo com IFPB *</label>
            <select 
              id="vinculoIFPB" 
              name="vinculoIFPB" 
              value={formData.vinculoIFPB} 
              onChange={handleChange}
            >
              <option value="">Selecione...</option>
              <option value="ALUNO">Aluno</option>
              <option value="SERVIDOR">Servidor</option>
              <option value="TERCEIRIZADO">Terceirizado</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="telefone">Telefone</label>
            <input 
              type="tel" 
              id="telefone" 
              name="telefone" 
              value={formData.telefone} 
              onChange={handleChange}
              placeholder="(XX) XXXXX-XXXX"
            />
          </div>

          <div className="cadastro-usuario-botoes">
            <button 
              type="submit" 
              className="btn-cadastrar"
              disabled={carregando}
            >
              {carregando ? 'Cadastrando...' : 'CADASTRAR'}
            </button>
            <button
              type="button"
              className="btn-voltar"
              onClick={handleVoltar}
              disabled={carregando}
            >
              VOLTAR
            </button>
          </div>
        </form>

        {carregando && (
          <p className="cadastro-usuario-carregando">
            Processando cadastro...
          </p>
        )}
      </div>
    </div>
  );
};

export default CadastroUsuarios;