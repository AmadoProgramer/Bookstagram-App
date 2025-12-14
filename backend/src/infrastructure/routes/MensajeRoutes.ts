import { Router } from 'express';
import { MensajeController } from '../controller/MensajeController';

export const createMensajeRoutes = (mensajeController: MensajeController): Router => {
  const router = Router();

  router.post('/', (req, res) => mensajeController.create(req, res));
  router.get('/:id', (req, res) => mensajeController.getById(req, res));
  router.get('/conversacion/:id_conversacion', (req, res) =>
    mensajeController.getByConversacion(req, res),
  );
  router.delete('/:id', (req, res) => mensajeController.delete(req, res));

  return router;
};
