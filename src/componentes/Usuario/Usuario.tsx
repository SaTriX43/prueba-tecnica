// src/componentes/Usuario.tsx
import React from 'react';
import Styles from './usuario.module.css'

// Definimos la interfaz Usuario dentro del archivo
interface Usuario {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

interface PropsUsuario {
  usuario: Usuario;
}

export default function Usuario({ usuario }: PropsUsuario) {
  return (
    <div className={Styles['usuario__contenedor']}>
      <h3>{usuario.name}</h3>
      <p>
        <strong>Usuario:</strong> {usuario.username}
      </p>
      <p>
        <strong>Email:</strong> {usuario.email}
      </p>
    </div>
  );
}