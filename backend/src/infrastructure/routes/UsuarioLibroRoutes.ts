import { Router } from 'express';
import { UsuarioLibroController } from '../controller/UsuarioLibroController';

export const createUsuarioLibroRoutes = (usuarioLibroController: UsuarioLibroController): Router => {
  const router = Router();

  router.post('/', (req, res) => usuarioLibroController.create(req, res));
  router.get('/:id', (req, res) => usuarioLibroController.getById(req, res));
  router.get('/usuario/:id_usuario', (req, res) => usuarioLibroController.getByUsuario(req, res));
  router.get('/libro/:id_libro', (req, res) => usuarioLibroController.getByLibro(req, res));
  router.get('/relacion/:id_usuario/:id_libro', (req, res) => usuarioLibroController.getRelacion(req, res));
  router.put('/:id', (req, res) => usuarioLibroController.update(req, res));
  router.delete('/:id', (req, res) => usuarioLibroController.delete(req, res));

  return router;
};
