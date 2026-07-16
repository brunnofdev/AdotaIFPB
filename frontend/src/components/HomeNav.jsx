import { Link, useNavigate } from 'react-router-dom';
import { useAuth, } from '../contexts/useAuth';

export function HomeNav(){

const navigate = useNavigate();
const { logout } = useAuth();
const { hasRole, user } = useAuth();
const isAdmin = hasRole('ROLE_ADMIN');

const handleLogout = () => {
    logout();
    navigate('/login');
  };
return (
<nav className="side-navbar">
  <h3 className="side-navbar-brand">AdotaIFPB</h3>
    <div className="side-navbar-links">
      <div className="nav-link">
        <img src="src/assets/home.png" alt="Home Icon" className="side-nav-icon" />
        <Link to="/home" className="side-nav-link side-nav-link-active">Início</Link>
      </div>
      <div className="nav-link">
        <img src="src/assets/animal.png" alt="Animal Icon" className="side-nav-icon" />
        <Link to="/animais" className="side-nav-link">Animais</Link>
      </div>
      {isAdmin && (
      <div className="nav-link">
        <img src="src/assets/user.png" alt="User Icon" className="side-nav-icon" />
        <Link to="/usuarios" className="side-nav-link">Usuários</Link>
      </div>
      )}
      {!isAdmin && (
      <div className="nav-link">
        <img src="src/assets/user.png" alt="User Icon" className="side-nav-icon" />
        <Link to="/usuarios" className="side-nav-link">Conta</Link>
      </div>
      )}
      <div className="nav-link">
        <img src="src/assets/hearth.png" alt="Adoption Icon" className="side-nav-icon" />
        <Link to="/solicitacoes" className="side-nav-link">Adoções</Link>
      </div>
    </div>
  <button className="logout-button" onClick={handleLogout}>Sair</button>
</nav>
)}