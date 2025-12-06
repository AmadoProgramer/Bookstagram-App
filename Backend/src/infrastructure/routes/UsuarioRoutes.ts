import { Router } from 'express';
import { UsuarioController } from '../controller/UsuarioController';

export const createUsuarioRoutes = (usuarioController: UsuarioController): Router => {
  const router = Router();

  router.post('/', (req, res) => usuarioController.create(req, res));
  router.get('/', (req, res) => usuarioController.getAll(req, res));
  router.get('/:id', (req, res) => usuarioController.getById(req, res));
  router.put('/:id', (req, res) => usuarioController.update(req, res));
  router.delete('/:id', (req, res) => usuarioController.delete(req, res));
  router.post('/:usuarioId/follow/:followId', (req, res) => usuarioController.follow(req, res));
  router.post('/:usuarioId/unfollow/:followId', (req, res) => usuarioController.unfollow(req, res));
  router.get('/:id/followers', (req, res) => usuarioController.getFollowers(req, res));
  router.get('/:id/following', (req, res) => usuarioController.getFollowing(req, res));

  return router;
};
