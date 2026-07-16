import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Animais from './pages/Animais';
import CadastroAnimais from './pages/CadastroAnimais';
import EditarAnimal from './pages/EditarAnimal';
import CadastroAbrigo from './pages/CadastroAbrigo';
import CadastroVacina from './pages/CadastroVacina';
import Usuarios from './pages/Usuarios';
import CadastroUsuarios from './pages/CadastroUsuarios';
import EditarUsuario from './pages/EditarUsuario';
import CadastroSolicitacao from './pages/CadastroSolicitacao';
import EditarSolicitacao from './pages/EditarSolicitacao';
import Solicitacoes from './pages/solicitacoes';
import {PrivateRoute} from './contexts/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <Toaster/>
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cadastro-usuarios" element={<CadastroUsuarios />} />

        <Route element={<PrivateRoute />}>
        <Route path="/animais" element={<Animais />} />
        <Route path="/cadastro-animais" element={<CadastroAnimais />} />
        <Route path="/editar-animal/:id" element={<EditarAnimal />} />
        <Route path="/cadastro-abrigo" element={<CadastroAbrigo />} />
        <Route path="/cadastro-vacina" element={<CadastroVacina />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/editar-usuario/:id" element={<EditarUsuario />} />
        <Route path="/solicitacoes" element={<Solicitacoes />} />
        <Route path="/cadastrar-solicitacao" element={<CadastroSolicitacao />} />
        <Route path="/editar-solicitacao/:id" element={<EditarSolicitacao />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);