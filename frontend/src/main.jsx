import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Animais from './pages/Animais';
import CadastroAnimais from './pages/CadastroAnimais';
import CadastroAbrigo from './pages/CadastroAbrigo';
import Usuarios from './pages/Usuarios';
import CadastroUsuarios from './pages/CadastroUsuarios';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Rota inicial padrão do sistema redireciona para o login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Declaração das telas do sistema */}
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/animais" element={<Animais />} />
        <Route path="/cadastro-animais" element={<CadastroAnimais />} />
        <Route path="/cadastro-abrigo" element={<CadastroAbrigo />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/cadastro-usuarios" element={<CadastroUsuarios />} />
        
        {/* Fallback para URLs inexistentes ou inválidas */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);