import { Request, Response } from 'express';
import { ConversacionService } from '../../application/services/ConversacionService';
import { ConversacionCreateDTO } from '../../application/dtos/conversacion/ConversacionCreateDTO';

export class ConversacionController {
  constructor(private conversacionService: ConversacionService) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const dto = req.body as ConversacionCreateDTO;
      const conversacion = await this.conversacionService.createConversacion(dto);
      res.status(201).json(conversacion);
    } catch (error) {
      res.status(500).json({ error: 'Error creating conversacion' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const conversacion = await this.conversacionService.getConversacionById(id);
      if (!conversacion) {
        res.status(404).json({ error: 'Conversacion not found' });
        return;
      }
      res.json(conversacion);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching conversacion' });
    }
  }

  async getByUsuarios(req: Request, res: Response): Promise<void> {
    try {
      const id_usuario1 = parseInt(req.params.id_usuario1, 10);
      const id_usuario2 = parseInt(req.params.id_usuario2, 10);
      const conversacion = await this.conversacionService.getConversacionByUsuarios(id_usuario1, id_usuario2);
      if (!conversacion) {
        res.status(404).json({ error: 'Conversacion not found' });
        return;
      }
      res.json(conversacion);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching conversacion' });
    }
  }

  async getByUsuario(req: Request, res: Response): Promise<void> {
    try {
      const id_usuario = parseInt(req.params.id_usuario, 10);
      const conversaciones = await this.conversacionService.getConversacionesByUsuario(id_usuario);
      res.json(conversaciones);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching conversaciones' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const success = await this.conversacionService.deleteConversacion(id);
      if (!success) {
        res.status(404).json({ error: 'Conversacion not found' });
        return;
      }
      res.json({ message: 'Conversacion deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting conversacion' });
    }
  }
}
