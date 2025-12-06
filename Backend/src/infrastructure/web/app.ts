import express from 'express';
import cors from 'cors';
import { AppDataSource } from '../config/data-base';
import { environmentVars } from '../config/environment-vars';
import { createAuthMiddleware } from './authMiddleware';

// Services
import { AuthService } from '../../application/services/AuthService';
import { UsuarioService } from '../../application/services/UsuarioService';
import { LibroService } from '../../application/services/LibroService';
import { OpinionService } from '../../application/services/OpinionService';
import { OpinionLikeService } from '../../application/services/OpinionLikeService';
import { ProgresoLibroService } from '../../application/services/ProgresoLibroService';
import { UsuarioLibroService } from '../../application/services/UsuarioLibroService';
import { ConversacionService } from '../../application/services/ConversacionService';
import { MensajeService } from '../../application/services/MensajeService';

// Controllers
import { UsuarioController } from '../controller/UsuarioController';
import { LibroController } from '../controller/LibroController';
import { OpinionController } from '../controller/OpinionController';
import { OpinionLikeController } from '../controller/OpinionLikeController';
import { ProgresoLibroController } from '../controller/ProgresoLibroController';
import { UsuarioLibroController } from '../controller/UsuarioLibroController';
import { ConversacionController } from '../controller/ConversacionController';
import { MensajeController } from '../controller/MensajeController';

// Routes
import { createUsuarioRoutes } from '../routes/UsuarioRoutes';
import { createLibroRoutes } from '../routes/LibroRoutes';
import { createOpinionRoutes } from '../routes/OpinionRoutes';
import { createOpinionLikeRoutes } from '../routes/OpinionLikeRoutes';
import { createProgresoLibroRoutes } from '../routes/ProgresoLibroRoutes';
import { createUsuarioLibroRoutes } from '../routes/UsuarioLibroRoutes';
import { createConversacionRoutes } from '../routes/ConversacionRoutes';
import { createMensajeRoutes } from '../routes/MensajeRoutes';

// Adapters
import { UsuarioAdapter } from '../adapter/UsuarioAdapter';
import { LibroAdapter } from '../adapter/LibroAdapter';
import { OpinionAdapter } from '../adapter/OpinionAdapter';
import { OpinionLikeAdapter } from '../adapter/OpinionLikeAdapter';
import { ProgresoLibroAdapter } from '../adapter/ProgresoLibroAdapter';
import { UsuarioLibroAdapter } from '../adapter/UsuarioLibroAdapter';
import { ConversacionAdapter } from '../adapter/ConversacionAdapter';
import { MensajeAdapter } from '../adapter/MensajeAdapter';

// Entities
import { UsuarioEntity } from '../entities/UsuarioEntity';
import { LibroEntity } from '../entities/LibroEntity';
import { OpinionEntity } from '../entities/OpinionEntity';
import { OpinionLikeEntity } from '../entities/OpinionLikeEntity';
import { ProgresoLibroEntity } from '../entities/ProgresoLibroEntity';
import { UsuarioLibroEntity } from '../entities/UsuarioLibroEntity';
import { ConversacionEntity } from '../entities/ConversacionEntity';
import { MensajeEntity } from '../entities/MensajeEntity';

export const createApp = () => {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Initialize Services and Adapters
  const authService = new AuthService();

  const usuarioRepository = AppDataSource.getRepository(UsuarioEntity);
  const usuarioAdapter = new UsuarioAdapter(usuarioRepository);
  const usuarioService = new UsuarioService(usuarioAdapter);

  const libroRepository = AppDataSource.getRepository(LibroEntity);
  const libroAdapter = new LibroAdapter(libroRepository);
  const libroService = new LibroService(libroAdapter);

  const opinionRepository = AppDataSource.getRepository(OpinionEntity);
  const opinionAdapter = new OpinionAdapter(opinionRepository);
  const opinionService = new OpinionService(opinionAdapter);

  const opinionLikeRepository = AppDataSource.getRepository(OpinionLikeEntity);
  const opinionLikeAdapter = new OpinionLikeAdapter(opinionLikeRepository);
  const opinionLikeService = new OpinionLikeService(opinionLikeAdapter);

  const progresoLibroRepository = AppDataSource.getRepository(ProgresoLibroEntity);
  const progresoLibroAdapter = new ProgresoLibroAdapter(progresoLibroRepository);
  const progresoLibroService = new ProgresoLibroService(progresoLibroAdapter);

  const usuarioLibroRepository = AppDataSource.getRepository(UsuarioLibroEntity);
  const usuarioLibroAdapter = new UsuarioLibroAdapter(usuarioLibroRepository);
  const usuarioLibroService = new UsuarioLibroService(usuarioLibroAdapter);

  const conversacionRepository = AppDataSource.getRepository(ConversacionEntity);
  const conversacionAdapter = new ConversacionAdapter(conversacionRepository);
  const conversacionService = new ConversacionService(conversacionAdapter);

  const mensajeRepository = AppDataSource.getRepository(MensajeEntity);
  const mensajeAdapter = new MensajeAdapter(mensajeRepository);
  const mensajeService = new MensajeService(mensajeAdapter);

  // Initialize Controllers
  const usuarioController = new UsuarioController(usuarioService, authService);
  const libroController = new LibroController(libroService);
  const opinionController = new OpinionController(opinionService);
  const opinionLikeController = new OpinionLikeController(opinionLikeService);
  const progresoLibroController = new ProgresoLibroController(progresoLibroService);
  const usuarioLibroController = new UsuarioLibroController(usuarioLibroService);
  const conversacionController = new ConversacionController(conversacionService);
  const mensajeController = new MensajeController(mensajeService);

  // Routes
  app.use('/api/usuarios', createUsuarioRoutes(usuarioController));
  app.use('/api/libros', createLibroRoutes(libroController));
  app.use('/api/opiniones', createOpinionRoutes(opinionController));
  app.use('/api/opinion-likes', createOpinionLikeRoutes(opinionLikeController));
  app.use('/api/progreso-libros', createProgresoLibroRoutes(progresoLibroController));
  app.use('/api/usuario-libros', createUsuarioLibroRoutes(usuarioLibroController));
  app.use('/api/conversaciones', createConversacionRoutes(conversacionController));
  app.use('/api/mensajes', createMensajeRoutes(mensajeController));

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({ status: 'OK' });
  });

  // Error handling middleware
  app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  });

  return app;
};
