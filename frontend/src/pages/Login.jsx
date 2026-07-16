import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../contexts/useAuth';
import toast from 'react-hot-toast';
import '../styles/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  
  
  const navigate = useNavigate();
  const { login, authenticated } = useAuth(); 

  useEffect(() => {
    if (authenticated) {
      navigate('/home');
    }
  }, [authenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !senha.trim()) {
      toast.error('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await api.post('/auth/login', {
        email: email,
        senha: senha
      });

      const jwtToken = response.data.token;
      login(jwtToken);
      
      toast.success('Login realizado com sucesso!');
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      toast.error('Credenciais inválidas. Verifique o seu e-mail e senha.');
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-system-title">Adota IFPB</h1>

      <div className="login-card-square">        
        <form onSubmit={handleLogin}>
          
          <div className="form-group">
            <label className="form-label">EMAIL</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="form-input"
              placeholder="seu.email@ifpb.edu.br"
            />
          </div>
          
          <div className="form-group-last">
            <label className="form-label">SENHA</label>
            <input 
              type="password" 
              value={senha} 
              onChange={(e) => setSenha(e.target.value)} 
              className="form-input"
              placeholder="Digite sua senha"
            />
          </div>
          
          <div className="button-group">
            <button type="submit" className="btn-submit">ENTRAR</button>
            <button 
              type="button" 
              className="btn-secondary" 
              onClick={() => navigate('/cadastro-usuarios')}
            >
              CRIAR CONTA
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;