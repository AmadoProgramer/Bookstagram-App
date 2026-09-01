import { Request, Response } from 'express';
import { ProgresoLibroService } from '../../application/services/ProgresoLibroService';
import { ProgresoLibroCreateDTO } from '../../application/dtos/progresoLibro/ProgresoLibroCreateDTO';
import { ProgresoLibroUpdateDTO } from '../../application/dtos/progresoLibro/ProgresoLibroUpdateDTO';

export class ProgresoLibroController {
  constructor(private progresoLibroService: ProgresoLibroService) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const dto = req.body as ProgresoLibroCreateDTO;
      const progreso = await this.progresoLibroService.createProgresoLibro(dto);
      res.status(201).json(progreso);
    } catch (error) {
      res.status(500).json({ error: 'Error creating progreso' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const progreso = await this.progresoLibroService.getProgresoLibroById(id);
      if (!progreso) {
        res.status(404).json({ error: 'Progreso not found' });
        return;
      }
      res.json(progreso);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching progreso' });
    }
  }

  async getByUsuario(req: Request, res: Response): Promise<void> {
    try {
      const id_usuario = parseInt(req.params.id_usuario, 10);
      const progresos = await this.progresoLibroService.getProgresoByUsuario(id_usuario);
      res.json(progresos);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching progresos' });
    }
  }

  async getByLibro(req: Request, res: Response): Promise<void> {
    try {
      const id_libro = parseInt(req.params.id_libro, 10);
      const progresos = await this.progresoLibroService.getProgresoByLibro(id_libro);
      res.json(progresos);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching progresos' });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const dto = req.body as ProgresoLibroUpdateDTO;
      const progreso = await this.progresoLibroService.updateProgresoLibro(id, dto);
      res.json(progreso);
    } catch (error) {
      res.status(500).json({ error: 'Error updating progreso' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const success = await this.progresoLibroService.deleteProgresoLibro(id);
      if (!success) {
        res.status(404).json({ error: 'Progreso not found' });
        return;
      }
      res.json({ message: 'Progreso deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting progreso' });
    }
  }
}
