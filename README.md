Proyecto Next.js con React y TypeScript
🚀 Instalación y Configuración
1️⃣ Clonar el Repositorio

  git clone <URL_DEL_REPO>
  cd nombre-del-proyecto

2️⃣ Crear el Proyecto con Next.js, React y TypeScript
  npx create-next-app@latest nombre-del-proyecto
  Opciones Recomendadas:
  TypeScript: Yes ✅
  ESLint: Yes ✅
  Tailwind CSS: No ❌
  src directory: Yes ✅
  App Router: Yes ✅
  Import alias: No ❌

3️⃣ Instalar Dependencias
  npm install
4️⃣ Correr el Servidor Local
  npm run dev
  Accede a http://localhost:3000 para ver la app funcionando. 🎉

📂 Estructura del Proyecto

proyecto/
├── public/                  # Archivos estáticos (imágenes, fuentes, etc.)
├── src/                     # Código fuente principal
│   ├── app/                 # Páginas y rutas con App Router
│   │   ├── posts/           # Sección de publicaciones
│   │   │   ├── [id]/        # Ruta dinámica para publicaciones individuales
│   │   │   │   ├── page.module.css  # Estilos específicos
│   │   │   │   └── page.tsx         # Página de publicación por ID
│   │   │   ├── layout.tsx   # Layout de la sección publicaciones
│   │   │   ├── page.module.css  # Estilos de la página principal
│   │   │   └── page.tsx     # Página principal de publicaciones
│   │   ├── users/           # Sección de usuarios
│   │   │   ├── [id]/        # Ruta dinámica para usuarios individuales
│   │   │   │   ├── page.module.css  # Estilos específicos
│   │   │   │   └── page.tsx         # Página de usuario por ID
│   │   │   ├── layout.tsx   # Layout de la sección usuarios
│   │   │   ├── page.module.css  # Estilos de la página principal
│   │   │   └── page.tsx     # Página principal de usuarios
│   │   ├── layout.tsx       # Layout raíz de la app
│   │   ├── page.tsx         # Página raíz (Home)
│   │   └── globals.css      # Estilos globales
│   ├── components/          # Componentes reutilizables
│   │   └── Usuario/         # Componente de usuario
│   │       ├── usuario.module.css  # Estilos del componente
│   │       └── Usuario.tsx         # Código del componente
│   ├── context/             # Gestión de estado con Context
│   │   ├── PublicacionContext.tsx  # Contexto para publicaciones
│   │   └── UsuarioContext.tsx      # Contexto para usuarios
│   ├── lib/                 # Utilidades y APIs
│   │   ├── publicacionesApi.ts     # Llamadas API para publicaciones
│   │   └── usuariosApi.ts          # Llamadas API para usuarios
│   └── estilos/             # Estilos adicionales
│       └── globals.css      # Estilos globales (duplicado o alternativo)
├── .eslintrc.json           # Configuración de ESLint
├── .gitignore               # Archivos ignorados por Git
├── jsconfig.json            # Configuración de JavaScript
├── next-env.d.ts            # Declaraciones de entorno Next.js
├── next.config.ts           # Configuración de Next.js
├── package.json             # Dependencias y scripts
├── README.md                # Documentación del proyecto
└── tsconfig.json            # Configuración de TypeScript

📄 Páginas
1. Página Home
  En esta página lo que hago es:

Centralizar las demás páginas para poder redirigirme a ellas por botones.
2. Página Usuarios (Principal)
  En esta página lo que hago es:

Recibir la información de context y mapearla para mostrarla en mi página por su componente Usuario.
Detectar el click en el li de cada usuario.
Un botón para regresar al Inicio y su función.
Manejo el cambio del input a través de un evento onChange y de su estado que recibe por context y que me ayuda a filtrar mis usuarios dependiendo si hay coincidencia en name o username.
[id]
Recibo la información anteriormente guardada en el context y la renderizo.
3. Página Publicaciones (Posts)
En esta página lo que hago es:

Recibir la información de el contexto PublicacionesContext.tsx para poder renderizarla.
Escuchar el click en la publicación e redirigir con useRouter a la página, también llamo a una función la cual detecta el id y guarda en context el id de el posts y sus comentarios.
Y también puedo regresar al inicio.
[id]
Renderizo la información que se guardó en el context.
Muestro los comentarios que recupero a través del contexto.
Un botón para regresar a la página de publicaciones.
Un formulario que me sirve para crear nuevos comentarios.

🌐 Context
1. UsuarioContext.tsx
Lo que hago es:

Recibo la información y los guardo en un estado para luego centralizar todo y poder distribuir mejor la información a mi página principal.
Uso lo que es una función que me ayuda a guardar el valor de lo que mi usuario escriba en el input y después filtra dependiendo de si hay coincidencias o no.
Detectar cuando un usuario hacer click en el componente de usuario guardo su id por un parámetro y llamo a la función usuarioGetPorId para obtener información específica de ese usuario por el id.
Aparte de manejar errores y estado de cargar con estados.

2. PublicacionesContext.tsx
Me ayuda a guardar la información de las publicaciones y poder enviarlas a cualquier parte de mi app.
Desarrollo el filtrado dinámico de publicaciones.
Desarrollo de función para agregar comentarios.
Manejo lo que son los estado de cargas y los errores con estados.

📚 Lib
Aquí voy a guardar los archivos para las llamadas a las APIs dependiendo si son de:

Usuarios (users)
Publicaciones (posts)
🧩 Componentes
Usuario.tsx
Es para agrupar la información del usuario y poder estilizar mejor e organizarlo mejor también recibe la información del padre.

🎨 Estilos
Uso module.css para mayor organización.

🏗 Decisión Arquitectónica
Use la estructura de carpetas app porque para mi parecer es más ordenada y puedes ir escalando las páginas conforme te apetezca, más organizado también.