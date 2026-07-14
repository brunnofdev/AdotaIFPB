import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
// IMPORTANTE: Ajuste o caminho abaixo se o seu arquivo do hook se chamar useAuth.js ou useAuth.jsx
import { useAuth } from '../contexts/useAuth'; 
import '../styles/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(''); 
  
  const navigate = useNavigate();
  // 1. Puxamos a variável 'authenticated' do nosso contexto
  const { login, authenticated } = useAuth(); 

  // 2. NOVO: O useEffect fica vigiando o 'authenticated'. 
  // Se ele mudar para true, redirecionamos com segurança.
  useEffect(() => {
    if (authenticated) {
      navigate('/home');
    }
  }, [authenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');

    try {
      const response = await api.post('/auth/login', {
        email: email,
        senha: senha
      });

      const jwtToken = response.data.token;
      
      // 3. Apenas chamamos o login. O useEffect acima fará o redirecionamento.
      login(jwtToken);

    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setErro('Credenciais inválidas. Verifique o seu e-mail e senha.');
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-system-title">Adota IFPB</h1>

      <div className="login-card-square">        
        <form onSubmit={handleLogin}>
          {erro && <div style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>{erro}</div>}

          <div className="form-group">
            <label className="form-label">EMAIL</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
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
              required 
              className="form-input"
              placeholder="Digite sua senha"
            />
          </div>
          
          <div className="button-group">
            <button type="submit" className="btn-submit">
              ENTRAR
            </button>
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