import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { buscarUsuarioPorId, atualizarUsuario, removerUsuario } from '../services/userService';
import '../styles/CadastroUsuarios.css';
import toast from 'react-hot-toast';

const EditarUsuario = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    vinculoIFPB: '',
    telefone: '',
    cargo: ''
  });

  useEffect(() => {
    carregarUsuario();
  }, [id]);

  const carregarUsuario = async () => {
    try {
      setCarregando(true);
      const usuario = await buscarUsuarioPorId(id);
      setFormData({
        nome: usuario.nome || '',
        email: usuario.email || '',
        vinculoIFPB: usuario.vinculoIFPB || '',
        telefone: usuario.telefone || ''
      });
    } catch (error) {
      console.error("Erro ao carregar usuário:", error);
      toast.error("Falha ao carregar dados do usuário. Verifique a conexão.");
    } finally {
      setCarregando(false);
    }
  };

  const handleVoltar = () => {
    navigate('/usuarios');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSalvando(true);

    try {
      await atualizarUsuario(id, formData);
      toast.success('Usuário atualizado com sucesso! Redirecionando...');

      setTimeout(() => {
        navigate('/usuarios');
      }, 1500);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      const backendError = error.response?.data;
      let errorMsg = "Erro ao atualizar usuário. Verifique os dados.";
      
      if (backendError && typeof backendError === 'object') {
        errorMsg = Object.values(backendError)[0];
      }

      toast.error(errorMsg);
    } finally {
      setSalvando(false);
    }
  };

  const handleRemoverConfirm = async () => {
    setSalvando(true);

    try {
      await removerUsuario(id);
      toast.success('Usuário removido com sucesso!');
      navigate('/usuarios');
    } catch (error) {
      console.error("Erro ao remover usuário:", error);
      toast.error('Erro ao remover o usuário. Tente novamente.');
    } finally {
      setSalvando(false);
      setShowConfirmDelete(false);
    }
  };

  if (carregando) {
    return (
      <div className="cadastro-usuario-page">
        <div className="cadastro-usuario-container">
          <p className="cadastro-usuario-carregando">Carregando dados do usuário...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cadastro-usuario-page">
      <div className="cadastro-usuario-container">
        <h1>Editar Usuário</h1>
        <p className="cadastro-usuario-descricao">
          Modifique os dados do usuário abaixo.
        </p>


        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nome">Nome Completo</label>
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
            <label htmlFor="email">Email Institucional</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange}
              placeholder="Ex: joao@academico.ifpb.edu.br"
              disabled
            />
            <small style={{ color: '#666', marginTop: '4px' }}>
              Email não pode ser alterado
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="vinculoIFPB">Vínculo com IFPB</label>
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
              disabled={salvando}
            >
              {salvando ? 'Atualizando...' : 'ATUALIZAR'}
            </button>
            <button
              type="button"
              className="btn-voltar"
              onClick={handleVoltar}
              disabled={salvando}
            >
              VOLTAR
            </button>
            <button
              type="button"
              className="btn-remover"
              onClick={() => setShowConfirmDelete(true)}
              disabled={salvando}
              style={{ 
                backgroundColor: '#d32f2f', 
                color: 'white',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              REMOVER
            </button>
          </div>
        </form>

        {showConfirmDelete && (
          <div style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#ffebee',
            border: '1px solid #d32f2f',
            borderRadius: '4px'
          }}>
            <p style={{ marginBottom: '15px', color: '#c62828' }}>
              <strong>Aviso:</strong> Você está prestes a remover este usuário. Esta ação não pode ser desfeita.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleRemoverConfirm}
                disabled={salvando}
                style={{
                  backgroundColor: '#d32f2f',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                {salvando ? 'Removendo...' : 'Confirmar Remoção'}
              </button>
              <button
                onClick={() => setShowConfirmDelete(false)}
                disabled={salvando}
                style={{
                  backgroundColor: '#666',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditarUsuario;
