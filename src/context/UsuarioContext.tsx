'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { usuarioGetPorId, usuariosGet } from '@/lib/usuariosApi';

interface Usuario {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

interface TipoUsuarioContexto {
  usuarios: Usuario[];
  usuariosFiltrados: Usuario[];
  usuarioSeleccionado : Usuario | null;
  cargando: boolean;
  error: string | null;
  obtenerUsuarios: () => Promise<void>;
  obtenerUsuarioPorId: (id: string) => Promise<void>;
  filtrarUsuarios: (terminoBusqueda: string) => void;
}

export const UsuarioContext = createContext<TipoUsuarioContexto | undefined>(undefined);

interface UsuarioContextProviderProps {
  children: ReactNode;
}

export const UsuarioContextProvider: React.FC<UsuarioContextProviderProps> = ({ children }) => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState<Usuario[]>([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const obtenerUsuarios = async () => {
    setCargando(true);
    setError(null);
    try {
      const data = await usuariosGet();
      setUsuarios(data);
      setUsuariosFiltrados(data);
    } catch (err) {
      setError('Fallo al obtener usuarios');
      console.log(err);
    } finally {
      setCargando(false);
    }
  };

  const obtenerUsuarioPorId = async (id: string) => {
    setCargando(true);
    setError(null);
    try {
      const usuario = await usuarioGetPorId(id);
      setUsuarioSeleccionado(usuario);
    } catch (err) {
      setError(`Fallo al obtener usuario con id ${id}`);
      console.log(err);
      setUsuarioSeleccionado(null);
    } finally {
      setCargando(false);
    }
  };



  const filtrarUsuarios = (terminoBusqueda: string) => {
    const termino = terminoBusqueda.toLowerCase();
    const filtrados = usuarios.filter((usuario) =>
      usuario.name.toLowerCase().includes(termino) || usuario.username.toLowerCase().includes(termino)
    );
    setUsuariosFiltrados(filtrados);
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  return (
    <UsuarioContext.Provider
      value={{
        usuarios,
        usuariosFiltrados,
        usuarioSeleccionado,
        cargando,
        error,
        obtenerUsuarios,
        filtrarUsuarios,
        obtenerUsuarioPorId
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
};