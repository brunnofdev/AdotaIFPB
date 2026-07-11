import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Lógica temporária
    if (email.trim() !== '' && senha.length >= 6) {
      localStorage.setItem('usuario_autenticado', 'true');
      navigate('/home');
    } else {
      alert('Por favor, insira um e-mail válido e uma senha com pelo menos 6 caracteres.');
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