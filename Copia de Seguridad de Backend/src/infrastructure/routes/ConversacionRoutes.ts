import { Router } from 'express';
import { ConversacionController } from '../controller/ConversacionController';

export const createConversacionRoutes = (conversacionController: ConversacionController): Router => {
  const router = Router();

  router.post('/', (req, res) => conversacionController.create(req, res));
  router.get('/:id', (req, res) => conversacionController.getById(req, res));
  router.get('/usuarios/:id_usuario1/:id_usuario2', (req, res) =>
    conversacionController.getByUsuarios(req, res),
  );
  router.get('/usuario/:id_usuario', (req, res) => conversacionController.getByUsuario(req, res));
  router.delete('/:id', (req, res) => conversacionController.delete(req, res));

  return router;
};
