'use client';

import React, { useContext } from 'react';
import { PublicacionContext } from '@/context/PublicacionContext';
import { useRouter } from 'next/navigation';
import Styles from './page.module.css';

export default function PublicacionDetalle({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = React.use(paramsPromise); 
  const contexto = useContext(PublicacionContext);
  const router = useRouter();

  if (!contexto) {
    throw new Error('PublicacionContext debe usarse dentro de un PublicacionContextProvider');
  }

  const { publicacionSeleccionada, cargando, error } = contexto;

  const volverAPublicaciones = () => {
    router.push('/posts');
  };

  if (cargando) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!publicacionSeleccionada || publicacionSeleccionada.id !== Number(params.id)) {
    return <p>No se encontró la publicación.</p>;
  }

  return (
    <div className={Styles['detalle-publicacion']}>
      <h1>Detalles de la Publicación</h1>
      <div className={Styles['detalle__publicacion-info']}>
        <p><strong>Título:</strong> {publicacionSeleccionada.title}</p>
        <p><strong>Contenido:</strong> {publicacionSeleccionada.body}</p>
        <p><strong>ID de la Publicación:</strong> {publicacionSeleccionada.id}</p>
        <p><strong>ID del Autor:</strong> {publicacionSeleccionada.userId}</p>
      </div>
      <button onClick={volverAPublicaciones} className={Styles['detalle__publicacion-boton']}>
        Volver a la lista
      </button>
      <div>
        <p>comentarios</p>
      </div>
    </div>
  );
}