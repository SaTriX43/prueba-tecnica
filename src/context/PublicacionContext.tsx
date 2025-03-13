'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { publicacionesGet, publicacionGetPorId, comentariosGetPorPublicacionId } from '@/lib/publicacionesApi';

interface Publicacion {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

interface TipoPublicacionContexto {
  publicaciones: Publicacion[];
  publicacionesFiltradas: Publicacion[];
  publicacionSeleccionada: Publicacion | null;
  comentarios: Comment[];
  cargando: boolean;
  error: string | null;
  obtenerPublicaciones: () => Promise<void>;
  obtenerPublicacionPorId: (id: string) => Promise<void>;
  obtenerComentariosPorPublicacionId: (postId: string) => Promise<void>; 
  filtrarPublicaciones: (terminoBusqueda: string) => void;
}

export const PublicacionContext = createContext<TipoPublicacionContexto | undefined>(undefined);

interface PublicacionContextProviderProps {
  children: ReactNode;
}

export const PublicacionContextProvider: React.FC<PublicacionContextProviderProps> = ({ children }) => {
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
  const [publicacionesFiltradas, setPublicacionesFiltradas] = useState<Publicacion[]>([]);
  const [publicacionSeleccionada, setPublicacionSeleccionada] = useState<Publicacion | null>(null);
  const [comentarios, setComentarios] = useState<Comment[]>([]); 
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const obtenerPublicaciones = async () => {
    setCargando(true);
    setError(null);
    try {
      const data = await publicacionesGet();
      setPublicaciones(data);
      setPublicacionesFiltradas(data);
    } catch (err) {
      setError('Fallo al obtener publicaciones');
      console.log(err);
    } finally {
      setCargando(false);
    }
  };

  const obtenerPublicacionPorId = async (id: string) => {
    setCargando(true);
    setError(null);
    try {
      const publicacion = await publicacionGetPorId(id);
      setPublicacionSeleccionada(publicacion);
      await obtenerComentariosPorPublicacionId(id);
    } catch (err) {
      setError(`Fallo al obtener publicación con id ${id}`);
      console.log(err);
      setPublicacionSeleccionada(null);
    } finally {
      setCargando(false);
    }
  };

  const obtenerComentariosPorPublicacionId = async (postId: string) => {
    setCargando(true);
    setError(null);
    try {
      const comentariosData = await comentariosGetPorPublicacionId(postId);
      setComentarios(comentariosData);
    } catch (err) {
      setError(`Fallo al obtener comentarios para la publicación con id ${postId}`);
      console.log(err);
      setComentarios([]);
    } finally {
      setCargando(false);
    }
  };

  const filtrarPublicaciones = (terminoBusqueda: string) => {
    const termino = terminoBusqueda.toLowerCase();
    const filtrados = publicaciones.filter((publicacion) =>
      publicacion.title.toLowerCase().includes(termino) || 
      publicacion.body.toLowerCase().includes(termino)
    );
    setPublicacionesFiltradas(filtrados);
  };

  useEffect(() => {
    obtenerPublicaciones();
  }, []);

  return (
    <PublicacionContext.Provider
      value={{
        publicaciones,
        publicacionesFiltradas,
        publicacionSeleccionada,
        comentarios,
        cargando,
        error,
        obtenerPublicaciones,
        obtenerPublicacionPorId,
        obtenerComentariosPorPublicacionId, 
        filtrarPublicaciones,
      }}
    >
      {children}
    </PublicacionContext.Provider>
  );
};