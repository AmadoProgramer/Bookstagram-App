import { Router } from 'express';
import { LibroController } from '../controller/LibroController';

export const createLibroRoutes = (libroController: LibroController): Router => {
  const router = Router();

  router.post('/', (req, res) => libroController.create(req, res));
  router.get('/', (req, res) => libroController.getAll(req, res));
  router.get('/search', (req, res) => libroController.search(req, res));
  router.get('/category/:categoria', (req, res) => libroController.getByCategory(req, res));
  router.get('/author/:autor', (req, res) => libroController.getByAuthor(req, res));
  router.get('/:id', (req, res) => libroController.getById(req, res));
  router.put('/:id', (req, res) => libroController.update(req, res));
  router.delete('/:id', (req, res) => libroController.delete(req, res));

  return router;
};
