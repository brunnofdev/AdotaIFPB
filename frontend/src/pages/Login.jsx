import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; // Importação do arquivo de estilo separado

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email.trim() !== '' && senha.length >= 6) {
      localStorage.setItem('usuario_autenticado', 'true');
      navigate('/home');
    } else {
      alert('Por favor, insira um e-mail válido e uma senha com pelo menos 6 caracteres.');
    }
  };

  return (
    <div className="login-container">
      {/* Nome do sistema posicionado FORA e ACIMA do quadrado branco */}
      <h1 className="login-system-title">Adota IFPB</h1>

      {/* Quadrado branco com os campos de login */}
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
          
          <button type="submit" className="btn-submit">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;