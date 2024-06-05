import React, { createContext, useContext, useState, useEffect } from 'react';

interface Local {
  id: number;
  name: string;
  risk: string;
}

interface ContextoEstadoGlobal {
  locais: Local[];
  adicionarLocal: (name: string, risk: string) => void;
  editarRisco: (id: number, novoRisco: string) => void;
  excluirLocal: (id: number) => void;
  carregarLocais: () => void;
}

const ContextoEstadoGlobal = createContext<ContextoEstadoGlobal>({
  locais: [],
  adicionarLocal: () => {},
  editarRisco: () => {},
  excluirLocal: () => {},
  carregarLocais: () => {},
});

export const useEstadoGlobal = () => useContext(ContextoEstadoGlobal);

export const ProvedorEstadoGlobal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locais, setLocais] = useState<Local[]>([]);

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
        },
        body: JSON.stringify({ name, risk }),
      });

      if (!response.ok) {
        throw new Error('Não foi possível adicionar o local');
      }

      const data = await response.json();
      setLocais([...locais, { id: data.id, name, risk }]);
    } catch (error) {
      console.error('Erro ao adicionar o local:', error);
    }
  };

  const editarRisco = async (id: number, novoRisco: string) => {
    try {
      const response = await fetch(`http://localhost:3000/locations/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ risk: novoRisco }),
      });

      if (!response.ok) {
        throw new Error('Não foi possível editar o risco');
      }

      const novosLocais = locais.map(local =>
        local.id === id ? { ...local, risk: novoRisco } : local
      );
      setLocais(novosLocais);
    } catch (error) {
      console.error('Erro ao editar o risco:', error);
    }
  };

  const excluirLocal = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/locations/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Não foi possível excluir o local');
      }

      const novosLocais = locais.filter(local => local.id !== id);
      setLocais(novosLocais);
    } catch (error) {
      console.error('Erro ao excluir o local:', error);
    }
  };

  useEffect(() => {
    carregarLocais();
  }, []);

  return (
    <ContextoEstadoGlobal.Provider value={{ locais, adicionarLocal, editarRisco, excluirLocal, carregarLocais }}>
      {children}
    </ContextoEstadoGlobal.Provider>
  );
};
