'use client';

import React, { useContext, useState } from 'react';
import { UsuarioContext } from '../context/UsuarioContext';
import Usuario from '../componentes/Usuario/Usuario';
import Styles from './page.module.css';

export default function Usuarios() {
  const contexto = useContext(UsuarioContext);

  if (!contexto) {
    throw new Error('UsuarioContext debe usarse dentro de un UsuarioContextProvider');
  }

  const { usuariosFiltrados, cargando, error, filtrarUsuarios } = contexto;
  const [terminoBusqueda, setTerminoBusqueda] = useState<string>('');

  const manejarCambioInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setTerminoBusqueda(valor);
    filtrarUsuarios(valor);
  };

  if (cargando) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={Styles['usuarios']}>
      <h1>App consumo de API - Santiago Gonzales</h1>
      <h2>Usuarios:</h2>
      <div className={Styles['usuarios__contenedor-input']}>
        <label htmlFor="busqueda">Buscar por nombre o username:</label>
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
          <li key={usuario.id}>
            <Usuario usuario={usuario} />
          </li>
        ))}
      </ul>
    </div>
  );
}