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

