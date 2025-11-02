import React, { useState, useEffect } from 'react';
import { LoginPage } from './components/LoginPage';
import { SignUpPage } from './components/SignUpPage';
import { MainApp } from './components/MainApp';

export interface User {
  name: string;
  email: string;
}

type AuthPage = 'login' | 'signup';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<AuthPage>('login');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleLogin = (email: string) => {
    // Mock login functionality
    const name = email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    setUser({ name, email });
    setIsAuthenticated(true);
  };

  const handleSignUp = (name: string, email: string) => {
    // Mock signup functionality
    setUser({ name, email });
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setCurrentPage('login');
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  if (!isAuthenticated) {
    if (currentPage === 'login') {
      return <LoginPage onLogin={handleLogin} onSwitchToSignUp={() => setCurrentPage('signup')} />;
    } else {
      return <SignUpPage onSignUp={handleSignUp} onSwitchToLogin={() => setCurrentPage('login')} />;
    }
  }

  if (!user) {
    // Should not happen if authenticated, but good for type safety
    return null;
  }

  return <MainApp user={user} onLogout={handleLogout} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} onUpdateUser={handleUpdateUser} />;
};

export default App;