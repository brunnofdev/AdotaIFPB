import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Rota inicial padrão do sistema redireciona para o login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Declaração das telas do sistema */}
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        
        {/* Fallback para URLs inexistentes ou inválidas */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);