import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService from './assets/auth'; // Adjust the import path

interface AuthContextType {
    loggedIn: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState<boolean>(AuthService.loggedIn());

    useEffect(() => {
        const token = AuthService.getToken();
        if (token) {
            setLoggedIn(!AuthService.isTokenExpired(token));
        }
    }, []);

    const login = (token: string) => {
        AuthService.login(token);
        setLoggedIn(true);
    };

    const logout = () => {
        AuthService.logout();
        setLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ loggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
