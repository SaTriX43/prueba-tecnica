'use client';

import React, { useContext, useState } from 'react';
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

  const { publicacionSeleccionada, comentarios, cargando, error, agregarComentario } = contexto;
  const [nuevoComentarioTexto, setNuevoComentarioTexto] = useState<string>('');

  const volverAPublicaciones = () => {
    router.push('/posts');
  };

  const manejarEnvioComentario = (e: React.FormEvent) => {
    e.preventDefault();
    if (nuevoComentarioTexto.trim() === '') return;

    const nuevoComentario = {
      id: Date.now(), 
      postId: Number(params.id),
      name: 'Usuario Anónimo',
      email: 'anonimo@example.com', 
      body: nuevoComentarioTexto,
    };

    agregarComentario(nuevoComentario);
    setNuevoComentarioTexto(''); 
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
      <div className={Styles['detalle__publicacion-comentarios']}>
        <h2>Comentarios</h2>
        {comentarios.length > 0 ? (
          <ul>
            {comentarios.map((comentario) => (
              <li key={comentario.id}>
                <strong>{comentario.name}</strong> ({comentario.email}): {comentario.body}
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay comentarios para esta publicación.</p>
        )}
        <form onSubmit={manejarEnvioComentario}>
          <textarea
            value={nuevoComentarioTexto}
            onChange={(e) => setNuevoComentarioTexto(e.target.value)}
            placeholder="Escribe tu comentario aquí..."
            className={Styles['detalle__publicacion-comentario-textarea']}
            rows={4}
            cols={50}
          />
          <br />
          <button className={Styles['detalle__publicacion-boton']} type="submit">Enviar Comentario</button>
        </form>
      </div>
    </div>
  );
}