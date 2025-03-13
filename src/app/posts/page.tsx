'use client';

import React, { useContext, useState } from 'react';
import { PublicacionContext } from '@/context/PublicacionContext';
import Styles from './page.module.css';
import { useRouter } from 'next/navigation';

export default function Posts() {
  const contexto = useContext(PublicacionContext);
  const router = useRouter();

  if (!contexto) {
    throw new Error('PublicacionContext debe usarse dentro de un PublicacionContextProvider');
  }

  const { publicacionesFiltradas, cargando, error, filtrarPublicaciones } = contexto;
  const [terminoBusqueda, setTerminoBusqueda] = useState<string>('');

  const manejarCambioInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setTerminoBusqueda(valor);
    filtrarPublicaciones(valor);
  };

  const volverAInicio = () => {
    router.push('/');
  };


  if (cargando) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={Styles['publicaciones']}>
      <button
        onClick={volverAInicio}
        className={Styles['publicaciones__boton-redireccion-inicio']}
      >
        Ir a Inicio
      </button>
      <h1>Lista de Publicaciones</h1>
      <div className={Styles['publicaciones__contenedor-input']}>
        <label htmlFor="busqueda">Buscar por título o contenido:</label>
        <input
          type="text"
          id="busqueda"
          className={Styles['publicaciones-input']}
          value={terminoBusqueda}
          onChange={manejarCambioInput}
          placeholder="Escribe para buscar..."
        />
      </div>
      <ul className={Styles['publicaciones__lista']}>
        {publicacionesFiltradas.map((publicacion) => (
          <li key={publicacion.id} className={Styles['publicaciones__lista-elementos']}>
            <h2>{publicacion.title}</h2>
            <p>{publicacion.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}