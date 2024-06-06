// hooks/EstadoGlobal.js
import React, { createContext, useContext, useState, useEffect } from 'react';

interface Local {
  id: number;
  name: string;
  risk: string;
}

interface ContextoEstadoGlobal {
  locais: Local[];
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, password: string, role: string) => Promise<void>;
  logout: () => void;
  carregarLocais: () => void;
  adicionarLocal: (name: string, risk: string) => void;
  editarRisco: (id: number, risk: string) => void;
  excluirLocal: (id: number) => void;
}

interface User {
  id: number;
  username: string;
  role: string;
  token: string;
}

const ContextoEstadoGlobal = createContext<ContextoEstadoGlobal>({
  locais: [],
  user: null,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  carregarLocais: () => {},
  adicionarLocal: () => {},
  editarRisco: () => {},
  excluirLocal: () => {},
});

export const useEstadoGlobal = () => useContext(ContextoEstadoGlobal);

export const ProvedorEstadoGlobal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locais, setLocais] = useState<Local[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const carregarLocais = async () => {
    try {
      const response = await fetch('http://localhost:3000/locations');
      if (!response.ok) {
        throw new Error('Não foi possível carregar os locais');
      }
      const data = await response.json();
      setLocais(data);
    } catch (error) {
      console.error('Erro ao carregar os locais:', error);
    }
  };

  const adicionarLocal = async (name: string, risk: string) => {
    try {
      const response = await fetch('http://localhost:3000/locations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ name, risk }),
      });
      if (!response.ok) {
        throw new Error('Não foi possível adicionar o local');
      }
      const newLocation = await response.json();
      setLocais([...locais, newLocation]);
    } catch (error) {
      console.error('Erro ao adicionar o local:', error);
    }
  };

  const editarRisco = async (id: number, risk: string) => {
    try {
      const response = await fetch(`http://localhost:3000/locations/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ risk }),
      });
      if (!response.ok) {
        throw new Error('Não foi possível editar o risco');
      }
      const updatedLocation = locais.map(local =>
        local.id === id ? { ...local, risk } : local
      );
      setLocais(updatedLocation);
    } catch (error) {
      console.error('Erro ao editar o risco:', error);
    }
  };

  const excluirLocal = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/locations/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user?.token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Não foi possível excluir o local');
      }
      setLocais(locais.filter(local => local.id !== id));
    } catch (error) {
      console.error('Erro ao excluir o local:', error);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Erro ao realizar o login');
      }
      const { token, ...userData } = await response.json();
      setUser({ ...userData, token });
    } catch (error) {
      console.error('Erro ao realizar o login:', error);
      throw error;
    }
  };

  const signup = async (username: string, password: string, role: string) => {
    try {
      const response = await fetch('http://localhost:3000/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Erro ao realizar o cadastro');
      }
    } catch (error) {
      console.error('Erro ao realizar o cadastro:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    carregarLocais();
  }, []);

  return (
    <ContextoEstadoGlobal.Provider value={{ locais, user, login, signup, logout, carregarLocais, adicionarLocal, editarRisco, excluirLocal }}>
      {children}
    </ContextoEstadoGlobal.Provider>
  );
};


