Proyecto Next.js con React y TypeScript

🚀 Instalación y configuración

1️⃣ Clonar el repositorio

git clone <URL_DEL_REPO>
cd nombre-del-proyecto

2️⃣ Crear el proyecto con Next.js, React y TypeScript

npx create-next-app@latest nombre-del-proyecto

Opciones recomendadas:

TypeScript: Yes ✅

ESLint: Yes ✅

Tailwind CSS: No ❌

src directory: Yes ✅

App Router: Yes ✅

Import alias: No ❌

3️⃣ Instalar dependencias

npm install

4️⃣ Estructura de carpetas recomendada

/src
  ├── app
  │   ├── page.tsx             # Página de inicio
  │   ├── users
  │   │   ├── page.tsx         # Página para listar usuarios
  │   │   └── [id]
  │   │       └── page.tsx     # Página de detalles de usuario
  │   └── posts
  │       ├── page.tsx         # Página para listar publicaciones
  │       └── [id]
  │           └── page.tsx     # Página de detalles de la publicación
  ├── components               # Componentes reutilizables
  │   ├── UserCard.tsx
  │   ├── PostCard.tsx
  │   └── Loader.tsx
  ├── lib
  │   └── api.ts               # Lógica para llamadas a la API
  └── styles
      └── globals.css          # Estilos globales

5️⃣ Correr el servidor local

npm run dev

Accede a http://localhost:3000 para ver la app funcionando. 🎉

---------------------------------------------------

1.-Pagina Home
En esta pagina lo que hago es:
-Centralizar las demas pagina para poder redirigirme a ellas por botones

2.-Pagina usuarios (principal)
En esta pagina lo que hago es:
-recibir la informacion de context y mapearla para mostrarla en mi pagina por su componente Usuario
-Detectar el click en el li de cada usuario
-Un boton para regresar al Inicio y su funcion
-Manejo el cambio del input a travez de un evento onChange y de su estado que recibe por context y que me ayuda a filtrar mis usuarios dependiendo si hay coincidencia en name o username




---------------------------------
Context
1.-UsuarioContext.tsx
lo que hago es:
-recibo la informacion y los guardo en un estado para luego centralizar todo y poder distribuir mejor la informacion a mi pagina principal 

-uso lo que es una funcion que me ayuda a guardar el valor de lo que mi usuario escriba en el input y despues filtra dependiendo de si hay coincidencias o no 

-Detectar cuando un usuario hacer click en el componente de usuario guardo su id por un parametro y llamo a la funcion usuarioGetPorId
para obtener informacion especifica de ese usuario por el id

-aparte de manejar errores y estado de cargar con estados

---------------------------------

lib
aqui voy a guardar los archivos para las llamadas a las api 
dependiendo si son de 
-usuarios(users)
-publicaciones(posts)


------------------------------------
Componentes 

Usuario.tsx: 
Es para agrupar la informacion del usuario y poder estilizar mejor e organizarlo mejor tambien 
recibe la informacion del padre



------------------------------------
Estilos
Uso module.css para mayor organizacion