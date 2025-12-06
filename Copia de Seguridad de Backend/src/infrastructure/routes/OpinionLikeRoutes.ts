import { Router } from 'express';
import { OpinionLikeController } from '../controller/OpinionLikeController';

export const createOpinionLikeRoutes = (opinionLikeController: OpinionLikeController): Router => {
  const router = Router();

  router.post('/', (req, res) => opinionLikeController.create(req, res));
  router.get('/:id', (req, res) => opinionLikeController.getById(req, res));
  router.get('/opinion/:id_opinion', (req, res) => opinionLikeController.getByOpinion(req, res));
  router.get('/usuario/:id_usuario', (req, res) => opinionLikeController.getByUsuario(req, res));
  router.post('/toggle', (req, res) => opinionLikeController.toggleLike(req, res));
  router.delete('/:id', (req, res) => opinionLikeController.delete(req, res));

  return router;
};
