import { Router } from 'express';
import { OpinionController } from '../controller/OpinionController';

export const createOpinionRoutes = (opinionController: OpinionController): Router => {
  const router = Router();

  router.post('/', (req, res) => opinionController.create(req, res));
  router.get('/', (req, res) => opinionController.getAll(req, res));
  router.get('/:id', (req, res) => opinionController.getById(req, res));
  router.get('/usuario/:id_usuario', (req, res) => opinionController.getByUsuario(req, res));
  router.get('/libro/:id_libro', (req, res) => opinionController.getByLibro(req, res));
  router.put('/:id', (req, res) => opinionController.update(req, res));
  router.delete('/:id', (req, res) => opinionController.delete(req, res));

  return router;
};
