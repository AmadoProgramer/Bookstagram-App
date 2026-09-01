# 📖 DOCUMENTACIÓN CONSOLIDADA: Bookstagram App - Autenticación

## 📚 Índice General

1. [Introducción Bookstagram](#-Introduccion-Bookstagram)
2. [Arquitectura General](#-arquitectura-general)
3. [Estructura Detallada del Proyecto](#-estructura-detallada-del-proyecto)
4. [Patrones de Diseño](#-patrones-de-diseño-utilizados)
5. [Entidades y Relaciones](#-entidades-principales-y-sus-relaciones)
6. [Frontend - Explicado](#-frontend)
7. [Backend - Explicado](#-backend)
8. [Seguridad Implementada](#-seguridad)
9. [Flujos de Datos](#-flujos-de-datos)
10. [Endpoints Disponibles](#-endpoints)
11. [Inyectar Usuarios](#-inyectar-usuarios-en-bd)
12. [Troubleshooting](#-troubleshooting)
13. [Lo Que Aprendiste](#-lo-que-aprendiste)


## 📘📙Bookstagram

Este proyecto partio de la necesidad de crear una aplicación que permite a los usuarios interactuar en una red social de una manera distinta a las fotos, videos etc. Esta vez basada en libros, lo cual incentiva la lectura colectiva y promueve la lectura vista desde un ecosistema moderno.

Todos los derechos reservados de esta aplicacion a:

* Nicolas Eduardo Martinez Amado
* Alex Avila 

## 🏗️ Arquitectura General

### Visión de Alto Nivel

```
┌─────────────────────────────────────────────────────────────────┐
│                      FRONTEND (React Native/Expo)               │
│  Capas: Views → Hooks → Services → API Client                  │
├─────────────────────────────────────────────────────────────────┤
│              ↓↓↓ HTTP REST (http://localhost:3000) ↓↓↓         │
├─────────────────────────────────────────────────────────────────┤
│          BACKEND (Express + TypeScript - Hexagonal)            │
│                                                                 │
│  Controllers (web) → Services (app) → Adapters → Domain        │
├─────────────────────────────────────────────────────────────────┤
│                         ↓↓↓ SQL ↓↓↓                           │
├─────────────────────────────────────────────────────────────────┤
│                    PostgreSQL (BD)                              │
│  Entidades: Usuario, Libro, Conversación, Opinión, etc.        │
└─────────────────────────────────────────────────────────────────┘
```

### Arquitectura Backend: Hexagonal (Puertos y Adaptadores)

```
┌─────────────────────────────────────────────────────────────────┐
│                    CAPA DE PRESENTACIÓN                         │
│  (infrastructure/controller/*)                                  │
│  AuthController, UsuarioController, LibroController, etc.      │
└───────────────────┬─────────────────────────────────────────────┘
                    │
┌───────────────────┴─────────────────────────────────────────────┐
│               CAPA DE APLICACIÓN                                │
│  (application/services/*, application/dtos/*)                  │
│  AuthService, UsuarioService, LibroService, etc.              │
│  Request/Response DTOs para validación y transferencia        │
└───────────────────┬─────────────────────────────────────────────┘
                    │
┌───────────────────┴─────────────────────────────────────────────┐
│               CAPA DE DOMINIO (NÚCLEO)                          │
│  (domain/*/Entidad.ts, domain/*/EntidadPort.ts)               │
│                                                                 │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────┐           │
│  │  Usuario    │  │    Libro     │  │ Conversación│           │
│  │  (Entity)   │  │   (Entity)   │  │  (Entity)  │           │
│  └─────────────┘  └──────────────┘  └─────────────┘           │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │              PUERTOS (Interfaces)                       │  │
│  │  UsuarioPort, LibroPort, ConversacionPort, etc.       │  │
│  │  Define contratos para datos externos                  │  │
│  └─────────────────────────────────────────────────────────┘  │
└───────────────────┬─────────────────────────────────────────────┘
                    │
┌───────────────────┴─────────────────────────────────────────────┐
│              CAPA DE INFRAESTRUCTURA                            │
│  (infrastructure/adapter/*)                                    │
│  UsuarioAdapter, LibroAdapter, ConversacionAdapter, etc.      │
│                                                                 │
│  Implementan los Puertos: Convertir BD ↔ Entidades            │
└───────────────────┬─────────────────────────────────────────────┘
                    │
┌───────────────────┴─────────────────────────────────────────────┐
│              BASE DE DATOS                                      │
│  (infrastructure/entities/*)                                   │
│  Modelos ORM de PostgreSQL (TypeORM)                           │
└─────────────────────────────────────────────────────────────────┘
```

### Beneficios de esta Arquitectura

| Aspecto | Ventaja |
|--------|---------|
| **Independencia** | Lógica de negocio sin dependencias de framework |
| **Testeable** | Fácil mockear puertos y adaptadores |
| **Mantenible** | Cambios en BD no afectan la lógica |
| **Escalable** | Agregar nuevas entidades es predecible |
| **Flexible** | Cambiar de BD sin modificar servicios |

---

## 📁 Estructura Detallada del Proyecto

### Backend: Organización por Capas

```
Backend/src/
│
├── 🌐 INFRAESTRUCTURA (Capa Externa)
│   ├── controller/
│   │   ├── AuthController.ts          → Maneja peticiones HTTP de auth
│   │   ├── UsuarioController.ts       → Maneja peticiones de usuarios
│   │   ├── LibroController.ts         → Maneja peticiones de libros
│   │   ├── ConversacionController.ts  → Maneja conversaciones
│   │   ├── MensajeController.ts       → Maneja mensajes
│   │   ├── OpinionController.ts       → Maneja opiniones
│   │   ├── ProgresoLibroController.ts → Maneja progreso de lectura
│   │   ├── OpinionLikeController.ts   → Maneja likes en opiniones
│   │   └── UsuarioLibroController.ts  → Maneja biblioteca del usuario
│   │
│   ├── routes/
│   │   └── [AuthRoutes, UsuarioRoutes, etc].ts
│   │       → Define mapeo HTTP: GET/POST/PUT/DELETE → Controladores
│   │
│   ├── adapter/
│   │   ├── UsuarioAdapter.ts         → BD → Usuario (Entidad)
│   │   ├── LibroAdapter.ts           → BD → Libro (Entidad)
│   │   ├── ConversacionAdapter.ts    → BD → Conversación
│   │   ├── MensajeAdapter.ts         → BD → Mensaje
│   │   ├── OpinionAdapter.ts         → BD → Opinion
│   │   ├── OpinionLikeAdapter.ts     → BD → OpinionLike
│   │   ├── ProgresoLibroAdapter.ts   → BD → ProgresoLibro
│   │   └── UsuarioLibroAdapter.ts    → BD → UsuarioLibro
│   │       Implementan los Puertos (Interfaces del Dominio)
│   │
│   ├── entities/
│   │   └── [TypeORM Entities] Usuario.ts, Libro.ts, etc.
│   │       → Modelos de BD exactos (columnas, relaciones)
│   │
│   ├── web/
│   │   ├── authMiddleware.ts         → Valida JWT en peticiones
│   │   ├── app.ts                    → Configuración Express
│   │   └── ...otros middlewares
│   │
│   ├── config/
│   │   ├── data-base.ts              → Conexión PostgreSQL
│   │   └── environment-vars.ts       → Variables de entorno
│   │
│   └── bootstrap/
│       └── server.bootstrap.ts       → Inicializa la app
│
├── 💼 APLICACIÓN (Capa Intermedia)
│   ├── services/
│   │   ├── AuthService.ts            → Lógica de autenticación
│   │   ├── UsuarioService.ts         → Lógica de usuarios
│   │   ├── LibroService.ts           → Lógica de libros
│   │   ├── ConversacionService.ts    → Lógica de conversaciones
│   │   ├── MensajeService.ts         → Lógica de mensajes
│   │   ├── OpinionService.ts         → Lógica de opiniones
│   │   ├── ProgresoLibroService.ts   → Lógica de progreso
│   │   ├── OpinionLikeService.ts     → Lógica de likes
│   │   └── UsuarioLibroService.ts    → Lógica de biblioteca
│   │       Orquestan adaptadores y validan reglas de negocio
│   │
│   └── dtos/
│       ├── usuario/
│       │   ├── CreateUsuarioDTO.ts   → Validar entrada para crear
│       │   ├── UpdateUsuarioDTO.ts   → Validar entrada para actualizar
│       │   └── UsuarioResponseDTO.ts → Formato respuesta
│       ├── libro/
│       ├── conversacion/
│       ├── mensaje/
│       ├── opinion/
│       ├── opinionLike/
│       ├── progresoLibro/
│       └── usuarioLibro/
│            DTOs = Data Transfer Objects
│           Definen estructura de datos en entrada/salida
│
├── 🎯 DOMINIO (Núcleo de Negocio)
│   ├── usuario/
│   │   ├── Usuario.ts                → Entidad (propiedades y métodos)
│   │   └── UsuarioPort.ts            → Puerto (interfaz de acceso)
│   ├── libro/
│   │   ├── Libro.ts
│   │   └── LibroPort.ts
│   ├── conversacion/
│   │   ├── Conversacion.ts
│   │   └── ConversacionPort.ts
│   ├── mensaje/
│   │   ├── Mensaje.ts
│   │   └── MensajePort.ts
│   ├── opinion/
│   │   ├── Opinion.ts
│   │   └── OpinionPort.ts
│   ├── opinionLike/
│   │   ├── OpinionLike.ts
│   │   └── OpinionLikePort.ts
│   ├── progresoLibro/
│   │   ├── ProgresoLibro.ts
│   │   └── ProgresoLibroPort.ts
│   └── usuarioLibro/
│       ├── UsuarioLibro.ts
│       └── UsuarioLibroPort.ts
│       
│   Entidades: Clases con propiedades e identidad
│   Puertos: Interfaces que definen cómo acceder a datos
│
└── index.ts                          → Punto de entrada
```

### Frontend: Organización por Característica

```
frontend/
│
├── 📱 VIEW (Pantallas/Screens)
│   ├── view/
│   │   ├── index.tsx                 → Pantalla principal/home
│   │   ├── add-book.tsx              → Agregar libro a biblioteca
│   │   ├── opinion-book.tsx          → Ver opiniones de un libro
│   │   ├── profile-booker.tsx        → Perfil del usuario
│   │   ├── messaging.tsx             → Mensajería/conversaciones
│   │   ├── notfound.tsx              → Página no encontrada
│   │   └── Login/
│   │       ├── login.tsx             → Pantalla de inicio de sesión
│   │       ├── login-problem.tsx     → Recuperación de contraseña
│   │       └── Viewmodel.tsx         → Lógica de vista
│   │   └── register/
│   │       ├── Register.tsx          → Pantalla de registro
│   │       ├── roundedButton.tsx     → Componente botón redondeado
│   │       └── viemodel.tsx          → Lógica de vista
│
├── 🧩 COMPONENTS (Componentes Reutilizables)
│   ├── components/
│   │   ├── navbar.tsx                → Barra de navegación superior
│   │   ├── menu.tsx                  → Menú lateral/drawer
│   │   └── customTextInput.tsx       → Input de texto personalizado
│
├── 🪝 HOOKS (Lógica Reutilizable)
│   └── Hook/
│       └── Useapi.tsx                → Hook para llamadas API
│
├── 🔌 SERVICES (Lógica de Negocio)
│   ├── services/
│   │   ├── api.tsx                   → Configuración URLs base
│   │   ├── auth.tsx                  → Funciones de autenticación
│   │   ├── authService.tsx           → Servicio auth con tokens
│   │   ├── bookService.tsx           → Servicio de libros
│   │   └── ...otros servicios
│       Comunican con Backend vía HTTP
│
├── 📦 ASSETS
│   └── assets/
│       └── images/                   → Imágenes estáticas
│
├── 🗺️ NAVEGACIÓN
│   ├── AppNavigator.tsx              → Estructura de rutas
│   └── App.tsx                       → App principal
│
├── 📄 CONFIGURACIÓN
│   ├── app.json                      → Configuración Expo
│   ├── package.json                  → Dependencias
│   ├── tsconfig.json                 → Configuración TypeScript
│   └── index.ts                      → Punto de entrada
```

### Flujo de Datos: Ejemplo Crear Usuario

```
1️⃣  FRONTEND (React Native)
    Usuario escribe: nombre, email, password
    ↓
    Register.tsx → register() function
    ↓
2️⃣  FRONTEND (Services)
    authService.register(datos)
    ↓
    services/api.tsx → fetch POST /api/auth/register
    ↓
3️⃣  BACKEND (HTTP)
    HTTP REQUEST → AuthRoutes.ts → POST /api/auth/register
    ↓
4️⃣  BACKEND (Controller)
    AuthController.register(req, res)
    ├─ req.body = { nombre, email, password }
    └─ Llama → AuthService.register()
    ↓
5️⃣  BACKEND (Application Service)
    AuthService.register(usuarioDTO)
    ├─ Valida datos (DTOs)
    ├─ Hashea password (bcrypt)
    └─ Llama → UsuarioAdapter.create()
    ↓
6️⃣  BACKEND (Adapter - Puerto de Salida)
    UsuarioAdapter.create(usuarioData)
    ├─ Implementa UsuarioPort
    └─ Inserta en BD usando TypeORM
    ↓
7️⃣  DATABASE (PostgreSQL)
    INSERT INTO usuario VALUES (...)
    ↓
8️⃣  BACKEND (Response)
    res.json({ token, usuario })
    ↓
9️⃣  FRONTEND (Response)
    Response.json()
    ├─ Guarda token en memoria
    ├─ Muestra Alert de éxito
    └─ Navega a home
    ↓
✅  Usuario creado y autenticado
```

---

## 🏢 Patrones de Diseño Utilizados

| Patrón | Dónde | Beneficio |
|--------|-------|----------|
| **Hexagonal** | Backend completo | Independencia de framework, fácil de testear |
| **Adapter** | infrastructure/adapter/ | Convierte BD → Dominio |
| **DTO** | application/dtos/ | Validación y transferencia de datos |
| **Service** | application/services/ | Lógica de negocio centralizada |
| **Repository** | A través de adapters | Acceso a datos abstracto |
| **Controller** | infrastructure/controller/ | Maneja HTTP → lógica |
| **Middleware** | infrastructure/web/ | Validación y seguridad |
| **Custom Hooks** | frontend/Hook/ | Reutilización de lógica React |

---

## 🔄 Entidades Principales y sus Relaciones

```
┌──────────────┐         ┌──────────────┐
│   Usuario    │◀────────┤    Libro     │
├──────────────┤  compra  ├──────────────┤
│ id_usuario   │          │ id_libro     │
│ nombre       │          │ titulo       │
│ email        │          │ autor        │
│ password     │          │ descripcion  │
│ bio          │          │ portada_url  │
│ avatar_url   │          │ genero       │
│ xp           │          └──────────────┘
│ seguidores   │
└──────────────┘
        │
        │ participa
        ▼
┌──────────────┐
│  Conversacion│
├──────────────┤
│ id_conversa  │
│ participante │
└──────────────┘
        │
        │ contiene
        ▼
┌──────────────┐
│   Mensaje    │
├──────────────┤
│ id_mensaje   │
│ contenido    │
│ timestamp    │
└──────────────┘

┌──────────────┐
│   Opinion    │◀──────┐
├──────────────┤       │
│ id_opinion   │       │
│ usuario_id   │       │ recibe
│ libro_id     │       │
│ puntuacion   │  ┌────────────┐
│ comentario   │  │ OpinionLike│
└──────────────┘  ├────────────┤
                  │ id_like    │
                  │ usuario_id │
                  │ opinion_id │
                  └────────────┘

┌──────────────────┐
│ ProgresoLibro    │
├──────────────────┤
│ id_progreso      │
│ usuario_id       │
│ libro_id         │
│ paginas_leidas   │
│ fecha_inicio     │
│ fecha_fin        │
└──────────────────┘

┌──────────────────┐
│ UsuarioLibro     │
├──────────────────┤
│ id_usuario_libro │
│ usuario_id       │
│ libro_id         │
│ estado           │ (leído, leyendo, quiero leer)
│ calificacion     │
└──────────────────┘
```

---

## 📱 Frontend

### Estructura de Archivos

```
frontend/
├── config/
│   └── api.ts                      🆕 BASE_URL + Endpoints
├── services/
│   ├── httpService.ts              🆕 Cliente HTTP
│   ├── authService.ts              🆕 login() register() logout()
│   ├── usuarioService.ts           🆕 getAllUsuarios() etc
│   └── libroService.ts             🆕 getAllLibros() etc
├── hooks/
│   └── useAsync.ts                 🆕 Hook para async operations
├── components/
│   └── TestAPI.tsx                 🆕 Componente de prueba
└── app/
    ├── login.tsx                   ✏️ Conectado al backend
    └── register.tsx                ✏️ Conectado al backend
```

### Config API (api.ts)

```typescript
export const API_CONFIG = {
  BASE_URL: 'http://localhost:3000',  // URL del backend
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/api/auth/login',
      REGISTER: '/api/auth/register',
      LOGOUT: '/api/auth/logout',
      REFRESH: '/api/auth/refresh',
    },
    USUARIOS: { ... },
    LIBROS: { ... }
  }
}
```

### HTTP Service (httpService.ts)

```typescript
class HttpService {
  private baseUrl = API_CONFIG.BASE_URL;
  private token: string = '';

  setToken(token: string) {
    this.token = token;  // Guarda en memoria
  }

  getHeaders() {
    const headers = { 'Content-Type': 'application/json' };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;  // Automático
    }
    return headers;
  }

  async post<T>(endpoint: string, data: any) {
    const url = `${this.baseUrl}${endpoint}`;
    // http://localhost:3000/api/auth/login
    
    const response = await fetch(url, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data)
    });
    return response.json();
  }
}
```

### Auth Service (authService.ts)

```typescript
class AuthService {
  async login(credentials: { email: string; password: string }) {
    const response = await httpService.post(
      API_CONFIG.ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    
    if (response.data?.token) {
      httpService.setToken(response.data.token);  // Guarda token
    }
    
    return response;
  }

  async register(data: {
    nombre: string;
    apodo: string;
    email: string;
    password: string;
  }) {
    const response = await httpService.post(
      API_CONFIG.ENDPOINTS.AUTH.REGISTER,
      data
    );
    
    if (response.data?.token) {
      httpService.setToken(response.data.token);
    }
    
    return response;
  }

  async logout() {
    return await httpService.post(
      API_CONFIG.ENDPOINTS.AUTH.LOGOUT,
      {}
    );
  }
}
```

### Login Component (login.tsx)

```typescript
export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Completa todos los campos");
      return;
    }

    try {
      setLoading(true);
      const response = await authService.login({ email, password });

      if (response.data?.token) {
        Alert.alert("Éxito", `¡Bienvenido ${response.data.usuario.nombre}!`);
        router.push("/");
      } else {
        Alert.alert("Error", response.error || "No se pudo iniciar sesión");
      }
    } catch (error) {
      Alert.alert("Error", "Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    // UI con inputs y botón
  );
}
```

---

## 🖥️ Backend

### Estructura de Archivos

```
Backend/src/
├── infrastructure/
│   ├── routes/
│   │   └── AuthRoutes.ts           🆕 Define rutas
│   ├── controller/
│   │   └── AuthController.ts       🆕 Procesa lógica
│   └── web/
│       ├── authMiddleware.ts       ✏️ Valida JWT
│       └── app.ts                  ✏️ Integración
├── application/
│   ├── dtos/auth/                  🆕 DTOs
│   │   ├── LoginDTO.ts
│   │   ├── RegisterDTO.ts
│   │   ├── AuthResponseDTO.ts
│   │   └── index.ts
│   └── services/
│       ├── AuthService.ts          (Existía)
│       └── UsuarioService.ts       ✏️ Actualizado
└── ...
```

### Auth Routes (AuthRoutes.ts)

```typescript
export const createAuthRoutes = (
  authController: AuthController,
  authMiddleware: AuthMiddleware,
): Router => {
  const router = Router();

  // Públicas
  router.post('/login', (req, res) => authController.login(req, res));
  router.post('/register', (req, res) => authController.register(req, res));
  router.post('/logout', (req, res) => authController.logout(req, res));

  // Protegidas
  router.post('/refresh',
    authMiddleware.authenticate.bind(authMiddleware),
    (req, res) => authController.refreshToken(req, res)
  );

  router.get('/me',
    authMiddleware.authenticate.bind(authMiddleware),
    (req, res) => authController.getProfile(req, res)
  );

  return router;
};
```

### Auth Controller (AuthController.ts)

```typescript
export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { nombre, apodo, email, password } = req.body;

      // Validar
      if (!nombre || !email || !password) {
        return res.status(400).json({ error: "Campos requeridos" });
      }

      // Hashear
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crear usuario
      const usuario = usuarioRepository.create({
        nombre, apodo, email,
        password: hashedPassword
      });
      await usuarioRepository.save(usuario);

      // Generar JWT
      const token = authService.generateToken(usuario.id_usuario);

      res.json({ token, usuario: { id, nombre, email } });
    } catch (error) {
      res.status(500).json({ error: "Error del servidor" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "Email y password requeridos" });
      }

      // Buscar usuario
      const usuario = await usuarioService
        .getUsuarioByEmailWithPassword(email);

      if (!usuario) {
        return res.status(401).json({ error: "Credenciales inválidas" });
      }

      // Comparar password
      const valid = await bcrypt.compare(password, usuario.password);

      if (!valid) {
        return res.status(401).json({ error: "Credenciales inválidas" });
      }

      // Generar token
      const token = authService.generateToken(usuario.id_usuario);

      res.json({ token, usuario: { id, nombre, email } });
    } catch (error) {
      res.status(500).json({ error: "Error del servidor" });
    }
  }

  async logout(req: Request, res: Response) {
    res.json({ message: "Sesión cerrada correctamente" });
  }

  async refreshToken(req: Request, res: Response) {
    try {
      const usuario = await usuarioService.getUsuarioById(req.user?.id);
      const token = authService.generateToken(usuario.id_usuario);
      res.json({ token, usuario });
    } catch (error) {
      res.status(401).json({ error: "No autorizado" });
    }
  }

  async getProfile(req: Request, res: Response) {
    try {
      const usuario = await usuarioService.getUsuarioById(req.user?.id);
      res.json(usuario);
    } catch (error) {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  }
}
```

### Auth Middleware (authMiddleware.ts)

```typescript
export class AuthMiddleware {
  constructor(private authService: AuthService) {}

  authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: "No autorizado" });
      }

      const token = authHeader.substring(7);

      const decoded = this.authService.verifyToken(token);
      req.user = decoded;

      next();
    } catch (error) {
      res.status(401).json({ error: "Token inválido" });
    }
  }
}
```

### Auth Service (AuthService.ts)

```typescript
export class AuthService {
  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  comparePasswords(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }

  generateToken(userId: number): string {
    return jwt.sign(
      { id: userId },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );
  }

  verifyToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET!);
  }
}
```

### App Integration (app.ts)

```typescript
export const createApp = (): Express => {
  const app = express();

  // Middlewares
  app.use(express.json());
  app.use(cors());

  // Auth setup
  const authService = new AuthService();
  const authMiddleware = new AuthMiddleware(authService);
  const authController = new AuthController(...);

  // Rutas
  app.use('/api/auth', createAuthRoutes(authController, authMiddleware));

  return app;
};
```

---

## 🔒 Seguridad

### Contraseñas con Bcrypt

```
Contraseña sin hashear: "password123"
                           ↓
                   bcrypt.hash(pw, 10)
                           ↓
Hash almacenado en BD: "$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36gZvWFm"

Características:
✓ Irreversible (no se puede "desencriptar")
✓ 10 rondas de salt (seguridad)
✓ Cada vez produce diferente hash
✓ Se compara con bcrypt.compare(plain, hashed)
```

### JWT Token

```
Token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZXhwIjoyMDI1...}=="

Composición:
- Encabezado: algoritmo (HS256)
- Carga útil: ID usuario + expiración (7 días)
- Firma: firmado con JWT_SECRET

Validación:
✓ Se verifica que no esté manipulado
✓ Se verifica que no haya expirado
✓ Se decodifica para obtener ID usuario
```

### CORS

```typescript
app.use(cors())  // Permite peticiones desde cualquier origen en desarrollo
```

### Headers Automáticos

```
Frontend envía petición:
GET /api/auth/me
Header: Authorization: Bearer eyJhbGc...

Backend recibe:
- Extrae token del header
- Verifica con JWT_SECRET
- Si válido: continúa
- Si inválido: retorna 401
```

---

## 🔄 Flujos de Datos

### Flujo 1: REGISTRO

```
Usuario escribe en formulario
    ↓
handleRegister()
    ↓
authService.register({nombre, apodo, email, password})
    ↓
httpService.post('/api/auth/register', datos)
    ↓
[HTTP] POST http://localhost:3000/api/auth/register
    ↓
AuthController.register()
    ├─ Valida datos
    ├─ Hashea password con bcrypt
    ├─ Crea usuario en BD
    └─ Genera JWT token
    ↓
Responde: { token, usuario }
    ↓
Frontend recibe
    ├─ httpService.setToken(token)
    ├─ Alert("¡Bienvenido!")
    └─ router.push("/")
    ↓
Usuario logueado ✓
```

### Flujo 2: LOGIN

```
Usuario ingresa email/password
    ↓
handleLogin()
    ↓
authService.login({email, password})
    ↓
httpService.post('/api/auth/login', credenciales)
    ↓
[HTTP] POST http://localhost:3000/api/auth/login
    ↓
AuthController.login()
    ├─ Valida campos
    ├─ Busca usuario en BD
    ├─ Compara password (bcrypt)
    └─ Genera JWT token
    ↓
Responde: { token, usuario }
    ↓
Frontend recibe token
    ├─ httpService.setToken(token)
    ├─ Alert("¡Bienvenido!")
    └─ router.push("/")
    ↓
Usuario logueado ✓
```

### Flujo 3: PETICIÓN PROTEGIDA

```
Frontend: GET /api/auth/me
    ↓
httpService.get() automáticamente agrega:
Authorization: Bearer {token}
    ↓
[HTTP] GET http://localhost:3000/api/auth/me
Header: Authorization: Bearer eyJhbGc...
    ↓
AuthMiddleware.authenticate()
    ├─ Extrae token del header
    ├─ jwt.verify(token, JWT_SECRET)
    ├─ Si válido: decifica ID usuario
    └─ req.user = { id: 1 }
    ↓
Si no válido → 401 Unauthorized
Si válido → continúa a AuthController.getProfile()
    ↓
AuthController.getProfile()
    └─ Retorna datos del usuario
    ↓
Frontend recibe datos
```

### Flujo 4: LOGOUT

```
Usuario presiona logout
    ↓
authService.logout()
    ↓
httpService.post('/api/auth/logout')
    ↓
[HTTP] POST http://localhost:3000/api/auth/logout
    ↓
AuthController.logout()
    └─ Responde: { message: "Sesión cerrada" }
    ↓
Frontend recibe
    ├─ httpService.setToken("")  // Limpia token
    ├─ Limpia datos de usuario
    └─ router.push("/login")
    ↓
Usuario deslogueado ✓
```

---

## 📊 Endpoints

### PUBLIC (Sin autenticación)

```
POST /api/auth/register
├─ Entrada: { nombre, apodo, email, password, codigoPostal?, bio?, foto? }
├─ Salida: { token, usuario { id, nombre, apodo, email } }
└─ Error: 400, 500

POST /api/auth/login
├─ Entrada: { email, password }
├─ Salida: { token, usuario { id, nombre, apodo, email } }
└─ Error: 400, 401, 500

POST /api/auth/logout
├─ Entrada: (vacío)
├─ Salida: { message: "Sesión cerrada correctamente" }
└─ Error: 500
```

### PROTECTED (Con Authorization: Bearer {token})

```
POST /api/auth/refresh
├─ Entrada: (token en header)
├─ Salida: { token: "nuevo_token", usuario { ... } }
└─ Error: 401, 404, 500

GET /api/auth/me
├─ Entrada: (token en header)
├─ Salida: { id, nombre, apodo, email, bio, foto, xp, seguidores, ... }
└─ Error: 401, 404, 500
```

### Status Codes

```
200 OK                   → Éxito
400 Bad Request          → Validación fallida (email vacío, etc)
401 Unauthorized         → Credenciales inválidas o sin token
404 Not Found            → Usuario no existe
500 Internal Server Error → Error del servidor
```

---

## 💾 Inyectar Usuarios en BD

### Opción 1: Script TypeScript (Recomendado)

```bash
cd Backend
npx ts-node seed-user.ts
```

Esto crea automáticamente:
```
Email:    test@example.com
Password: password123
```

### Opción 2: SQL Directo

```sql
INSERT INTO usuario (nombre, email, username, password)
VALUES (
  'Usuario Prueba',
  'test@example.com',
  'usuarioPrueba',
  '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36gZvWFm'
);
```

### Verificar Creación

```bash
psql -U tu_usuario -d nombre_bd -c \
  "SELECT * FROM usuario WHERE email = 'test@example.com';"
```
 
---

## 🐛 Troubleshooting

### Error: ECONNREFUSED
**Problema:** No puede conectarse a PostgreSQL

**Soluciones:**
1. Verifica que PostgreSQL está corriendo
2. Verifica credenciales en Backend/.env
3. Intenta conectar manualmente: `psql -U usuario -d db`

### Error: "Email already exists"
**Problema:** El usuario ya está en BD

**Solución:**
```bash
# Borra y crea de nuevo
psql -U usuario -d db -c "DELETE FROM usuario WHERE email = 'test@example.com';"
npx ts-node seed-user.ts
```

### Error: Network Error en la app
**Problema:** Frontend no se conecta al Backend

**Soluciones:**
1. Verifica que Backend está corriendo en puerto 3000
2. Verifica frontend/config/api.ts tiene: `BASE_URL: 'http://localhost:3000'`
3. Si en emulador Android: usa `http://10.0.2.2:3000`
4. Si en dispositivo físico: usa `http://tu_ip_local:3000`

### Error: Login retorna 401
**Problema:** Credenciales incorrectas

**Verificaciones:**
1. ¿Ejecutaste `npx ts-node seed-user.ts`?
2. ¿El usuario existe en BD?
3. ¿Credenciales exactas? (sin espacios)

### Error: CORS error
**Problema:** Origen no permitido

**Solución:**
- Backend tiene `app.use(cors())` habilitado
- Frontend debe apuntar a URL correcta

### Error: "Module not found: ts-node"
**Problema:** Dependencia no instalada

**Solución:**
```bash
npm install --save-dev ts-node
```

---

### Conceptos Clave

| Concepto | Qué es | Ejemplo |
|----------|--------|---------|
| **JWT** | Token que identifica al usuario | `Authorization: Bearer eyJhbGc...` |
| **Bcrypt** | Algoritmo para hashear contraseñas | `password123 → $2b$10$N9q...` |
| **Hash** | Conversión irreversible | No se puede revertir a original |
| **Token** | "Carnet" digital con expiración | Se envía en cada petición protegida |
| **Middleware** | Función antes del controlador | Valida JWT automáticamente |
| **Endpoint** | Dirección HTTP del servidor | `/api/auth/login` |
| **CORS** | Permite peticiones desde otro origen | Frontend → Backend |
| **Status Code** | Número que indica resultado | 200 (éxito), 401 (no autenticado) |

### Lo que funciona

✅ Frontend conectado con Backend
✅ Usuarios pueden registrarse
✅ Usuarios pueden hacer login
✅ Contraseñas hasheadas y seguras
✅ Tokens JWT validados
✅ Rutas protegidas
✅ Peticiones automáticas con token

### Próximos pasos opcionales

1. Persistencia: Guardar token en AsyncStorage
2. Más endpoints: Libros, opiniones, usuarios
3. Refresh automático: Antes de que expire
4. Email verification: Validar email real
5. Recuperación de contraseña
6. Autenticación social: Google/Apple

---

## 📞 Resumen Ultra Rápido

**Para ejecutar en 5 minutos:**

```bash
# 1. Inyectar usuario
cd Backend && npx ts-node seed-user.ts

# 2. Backend (Terminal 1)
npm run dev

# 3. Frontend (Terminal 2)
cd ../frontend && npm start

# 4. En la app:
# Email:    test@example.com
# Password: password123
```

**Documentación:**

- Rápida: GUIA_RAPIDA.txt
- Completa: RESUMEN_COMPLETO_AUTH.md
- Visual: DIAGRAMA_ARQUITECTURA.md
- Detallada: MAPEO_CONEXIONES.md
- Educativa: LO_QUE_APRENDIMOS.md

---
