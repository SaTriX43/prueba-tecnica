'use client';

import React, { useContext } from 'react';
import { UsuarioContext } from '@/context/UsuarioContext';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function UsuarioDetalle({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = React.use(paramsPromise); 
  const contexto = useContext(UsuarioContext);
  const router = useRouter();

  if (!contexto) {
    throw new Error('UsuarioContext debe usarse dentro de un UsuarioContextProvider');
  }

  const { usuarioSeleccionado, cargando, error } = contexto;

  const volverAUsuarios = () => {
    router.push('/users');
  };

  if (cargando) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!usuarioSeleccionado || usuarioSeleccionado.id !== Number(params.id)) {
    return <p>No se encontró el usuario.</p>;
  }

  return (
    <div className={styles['detalle-usuario']}>
      <h1>Detalles del Usuario</h1>
      <div className={styles['detalle__usuario-info']}>
        <p><strong>Nombre:</strong> {usuarioSeleccionado.name}</p>
        <p><strong>Usuario:</strong> {usuarioSeleccionado.username}</p>
        <p><strong>Email:</strong> {usuarioSeleccionado.email}</p>
        <p><strong>Teléfono:</strong> {usuarioSeleccionado.phone}</p>
        <p><strong>Sitio web:</strong> {usuarioSeleccionado.website}</p>
      </div>
      <button onClick={volverAUsuarios} className={styles['detalle__usuario-boton']}>
        Volver a la lista
      </button>
    </div>
  );
}