import { Request, Response } from 'express';
import { OpinionService } from '../../application/services/OpinionService';
import { OpinionCreateDTO } from '../../application/dtos/opinion/OpinionCreateDTO';
import { OpinionUpdateDTO } from '../../application/dtos/opinion/OpinionUpdateDTO';

export class OpinionController {
  constructor(private opinionService: OpinionService) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const dto = req.body as OpinionCreateDTO;
      const opinion = await this.opinionService.createOpinion(dto);
      res.status(201).json(opinion);
    } catch (error) {
      res.status(500).json({ error: 'Error creating opinion' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const opinion = await this.opinionService.getOpinionById(id);
      if (!opinion) {
        res.status(404).json({ error: 'Opinion not found' });
        return;
      }
      res.json(opinion);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching opinion' });
    }
  }

  async getByUsuario(req: Request, res: Response): Promise<void> {
    try {
      const id_usuario = parseInt(req.params.id_usuario, 10);
      const opiniones = await this.opinionService.getOpinionesByUsuario(id_usuario);
      res.json(opiniones);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching opiniones' });
    }
  }

  async getByLibro(req: Request, res: Response): Promise<void> {
    try {
      const id_libro = parseInt(req.params.id_libro, 10);
      const opiniones = await this.opinionService.getOpinionesByLibro(id_libro);
      res.json(opiniones);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching opiniones' });
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const opiniones = await this.opinionService.getAllOpiniones();
      res.json(opiniones);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching opiniones' });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const dto = req.body as OpinionUpdateDTO;
      const opinion = await this.opinionService.updateOpinion(id, dto);
      res.json(opinion);
    } catch (error) {
      res.status(500).json({ error: 'Error updating opinion' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const success = await this.opinionService.deleteOpinion(id);
      if (!success) {
        res.status(404).json({ error: 'Opinion not found' });
        return;
      }
      res.json({ message: 'Opinion deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting opinion' });
    }
  }
}
