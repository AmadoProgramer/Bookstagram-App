import { Router } from 'express';
import { ProgresoLibroController } from '../controller/ProgresoLibroController';

export const createProgresoLibroRoutes = (progresoLibroController: ProgresoLibroController): Router => {
  const router = Router();

  router.post('/', (req, res) => progresoLibroController.create(req, res));
  router.get('/:id', (req, res) => progresoLibroController.getById(req, res));
  router.get('/usuario/:id_usuario', (req, res) => progresoLibroController.getByUsuario(req, res));
  router.get('/libro/:id_libro', (req, res) => progresoLibroController.getByLibro(req, res));
  router.put('/:id', (req, res) => progresoLibroController.update(req, res));
  router.delete('/:id', (req, res) => progresoLibroController.delete(req, res));

  return router;
};
