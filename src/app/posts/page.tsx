'use client';

import React, { useContext } from 'react';
import { PublicacionContext } from '@/context/PublicacionContext';
import Styles from './page.module.css';

export default function Posts() {
  const contexto = useContext(PublicacionContext);

  if (!contexto) {
    throw new Error('PublicacionContext debe usarse dentro de un PublicacionContextProvider');
  }

  const { publicaciones, cargando, error } = contexto;

  if (cargando) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={Styles['publicaciones']}>
      <h1>Lista de Publicaciones</h1>
      <ul className={Styles['publicaciones__lista']}>
        {publicaciones.map((publicacion) => (
          <li key={publicacion.id} className={Styles['publicaciones__lista-elementos']}>
            <h2>{publicacion.title}</h2>
            <p>{publicacion.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}