import { createContext, useState} from 'react';
import { jwtDecode } from 'jwt-decode';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    
    const [user, setUser] = useState(() => {
        const recoveredToken = localStorage.getItem('token');
        if (recoveredToken) {
            try {
                const decoded = jwtDecode(recoveredToken);
                const currentTime = Date.now() / 1000;
                
                if (decoded.exp > currentTime) {
                    return decoded;
                } else {
                    localStorage.removeItem('token');
                }
            } catch (error) {
                console.error("Erro ao decodificar token recuperado:", error);
                localStorage.removeItem('token');
            }
        }
        return null;
    });

    const [token, setToken] = useState(() => {
        return user ? localStorage.getItem('token') : null;
    });

    const login = (jwtToken) => {
        try {
            const decoded = jwtDecode(jwtToken);
            localStorage.setItem('token', jwtToken);
            setToken(jwtToken);
            setUser(decoded);
        } catch (error) {
            console.error("Erro ao processar o token de login:", error);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    const hasRole = (role) => {
        if (!user || !user.roles) return false;
        return user.roles.includes(role);
    };

    return (
        <AuthContext.Provider value={{ 
            authenticated: !!user, 
            user, 
            token, 
            loading: false,
            login, 
            logout,
            hasRole
        }}>
            {children}
        </AuthContext.Provider>
    );
};
