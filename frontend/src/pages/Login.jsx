import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Validação local temporária para a Release 3 (mínimo de 6 caracteres na senha)
    if (email.trim() !== '' && senha.length >= 6) {
      // Guarda uma flag simples no localStorage para simular que o usuário está logado
      localStorage.setItem('usuario_autenticado', 'true');
      navigate('/home');
    } else {
      alert('Por favor, insira um e-mail válido e uma senha com pelo menos 6 caracteres.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '30px', borderRadius: '8px', backgroundColor: '#ffffff', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', color: '#004c00', marginBottom: '24px' }}>AdotaIFPB - Entrar</h2>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>E-mail:</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Senha:</label>
            <input 
              type="password" 
              value={senha} 
              onChange={(e) => setSenha(e.target.value)} 
              required 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            />
          </div>
          <button type="submit" style={{ width: '100%', padding: '12px', borderRadius: '4px', border: 'none', backgroundColor: '#004c00', color: '#fff', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;