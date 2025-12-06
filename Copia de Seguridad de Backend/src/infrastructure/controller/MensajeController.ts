import { Request, Response } from 'express';
import { MensajeService } from '../../application/services/MensajeService';
import { MensajeCreateDTO } from '../../application/dtos/mensaje/MensajeCreateDTO';

export class MensajeController {
  constructor(private mensajeService: MensajeService) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const dto = req.body as MensajeCreateDTO;
      const mensaje = await this.mensajeService.createMensaje(dto);
      res.status(201).json(mensaje);
    } catch (error) {
      res.status(500).json({ error: 'Error creating mensaje' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const mensaje = await this.mensajeService.getMensajeById(id);
      if (!mensaje) {
        res.status(404).json({ error: 'Mensaje not found' });
        return;
      }
      res.json(mensaje);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching mensaje' });
    }
  }

  async getByConversacion(req: Request, res: Response): Promise<void> {
    try {
      const id_conversacion = parseInt(req.params.id_conversacion, 10);
      const mensajes = await this.mensajeService.getMensajesByConversacion(id_conversacion);
      res.json(mensajes);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching mensajes' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const success = await this.mensajeService.deleteMensaje(id);
      if (!success) {
        res.status(404).json({ error: 'Mensaje not found' });
        return;
      }
      res.json({ message: 'Mensaje deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting mensaje' });
    }
  }
}
