'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { publicacionesGet } from '@/lib/publicacionesApi';

interface Publicacion {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface TipoPublicacionContexto {
  publicaciones: Publicacion[];
  cargando: boolean;
  error: string | null;
  obtenerPublicaciones: () => Promise<void>;
}

export const PublicacionContext = createContext<TipoPublicacionContexto | undefined>(undefined);

interface PublicacionContextProviderProps {
  children: ReactNode;
}

export const PublicacionContextProvider: React.FC<PublicacionContextProviderProps> = ({ children }) => {
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const obtenerPublicaciones = async () => {
    setCargando(true);
    setError(null);
    try {
      const data = await publicacionesGet();
      setPublicaciones(data);
    } catch (err) {
      setError('Fallo al obtener publicaciones');
      console.log(err);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerPublicaciones();
  }, []);

  return (
    <PublicacionContext.Provider
      value={{
        publicaciones,
        cargando,
        error,
        obtenerPublicaciones,
      }}
    >
      {children}
    </PublicacionContext.Provider>
  );
};