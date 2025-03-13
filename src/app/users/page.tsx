'use client';

import React, { useContext, useState } from 'react';
import { UsuarioContext } from '@/context/UsuarioContext';
import Usuario from '@/componentes/Usuario/Usuario';
import { useRouter } from 'next/navigation';
import Styles from './page.module.css';

export default function Usuarios() {
  const contexto = useContext(UsuarioContext);
  const router = useRouter();

  if (!contexto) {
    throw new Error('UsuarioContext debe usarse dentro de un UsuarioContextProvider');
  }

  const { usuariosFiltrados, cargando, error, filtrarUsuarios, obtenerUsuarioPorId } = contexto;
  const [terminoBusqueda, setTerminoBusqueda] = useState<string>('');

  const manejarCambioInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setTerminoBusqueda(valor);
    filtrarUsuarios(valor);
  };

  const manejarClickUsuario = async (id: number) => {
    try {
      await obtenerUsuarioPorId(id.toString()); 
      router.push(`/users/${id}`); 
    } catch (err) {
      console.error('Error al redirigir:', err);
    }
  };

  const volverAInicio = () => {
    router.push('/');
  };

  if (cargando) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={Styles['usuarios']}>
      <button
        onClick={volverAInicio}
        className={Styles['usuarios__boton-redireccion-inicio']}
      >
        Ir a Inicio
      </button>
      <h2>Usuarios:</h2>
      <div className={Styles['usuarios__contenedor-input']}>
        <label htmlFor="busqueda">Buscar por nombre o usuario:</label>
        <input
          type="text"
          id="busqueda"
          className={Styles['usuarios-input']}
          value={terminoBusqueda}
          onChange={manejarCambioInput}
          placeholder="Escribe para buscar..."
        />
      </div>
      <ul className={Styles['usuarios__contenedor-ul']}>
        {usuariosFiltrados.map((usuario) => (
          <li
            key={usuario.id}
            onClick={() => manejarClickUsuario(usuario.id)}
            style={{ cursor: 'pointer' }}
          >
            <Usuario usuario={usuario} />
          </li>
        ))}
      </ul>
    </div>
  );
}