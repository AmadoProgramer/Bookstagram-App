import { Request, Response } from 'express';
import { LibroService } from '../../application/services/LibroService';
import { LibroCreateDTO } from '../../application/dtos/libro/LibroCreateDTO';
import { LibroUpdateDTO } from '../../application/dtos/libro/LibroUpdateDTO';

export class LibroController {
  constructor(private libroService: LibroService) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const dto = req.body as LibroCreateDTO;
      const libro = await this.libroService.createLibro(dto);
      res.status(201).json(libro);
    } catch (error) {
      res.status(500).json({ error: 'Error creating libro' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const libro = await this.libroService.getLibroById(id);
      if (!libro) {
        res.status(404).json({ error: 'Libro not found' });
        return;
      }
      res.json(libro);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching libro' });
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const libros = await this.libroService.getAllLibros();
      res.json(libros);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching libros' });
    }
  }

  async getByCategory(req: Request, res: Response): Promise<void> {
    try {
      const categoria = req.params.categoria as string;
      const libros = await this.libroService.getLibrosByCategory(categoria);
      res.json(libros);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching libros by category' });
    }
  }

  async getByAuthor(req: Request, res: Response): Promise<void> {
    try {
      const autor = req.params.autor as string;
      const libros = await this.libroService.getLibrosByAuthor(autor);
      res.json(libros);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching libros by author' });
    }
  }

  async search(req: Request, res: Response): Promise<void> {
    try {
      const query = req.query.q as string;
      const libros = await this.libroService.searchLibros(query);
      res.json(libros);
    } catch (error) {
      res.status(500).json({ error: 'Error searching libros' });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const dto = req.body as LibroUpdateDTO;
      const libro = await this.libroService.updateLibro(id, dto);
      res.json(libro);
    } catch (error) {
      res.status(500).json({ error: 'Error updating libro' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const success = await this.libroService.deleteLibro(id);
      if (!success) {
        res.status(404).json({ error: 'Libro not found' });
        return;
      }
      res.json({ message: 'Libro deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting libro' });
    }
  }
}
