'use client'
import { useRouter } from 'next/navigation';
import Styles from './page.module.css'

export default function Home() {

    const router = useRouter()

    function cambiarPagina(pagina: string) {
        if(pagina === 'usuarios') {
            router.push('/users')
        }else if(pagina === 'publicaciones') {
            router.push('/posts')
        }
    }

  return (
    <div>
        <button className={Styles['home__boton-redireccion']} onClick={() => cambiarPagina('usuarios')}>Usuarios</button>
        <button className={Styles['home__boton-redireccion']} onClick={() => cambiarPagina('publicaciones')}>Posts</button>
    </div>
  )
}