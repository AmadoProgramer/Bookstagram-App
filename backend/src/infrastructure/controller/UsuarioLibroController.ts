import { Request, Response } from 'express';
import { UsuarioLibroService } from '../../application/services/UsuarioLibroService';
import { UsuarioLibroCreateDTO } from '../../application/dtos/usuarioLibro/UsuarioLibroCreateDTO';
import { UsuarioLibroUpdateDTO } from '../../application/dtos/usuarioLibro/UsuarioLibroUpdateDTO';

export class UsuarioLibroController {
  constructor(private usuarioLibroService: UsuarioLibroService) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const dto = req.body as UsuarioLibroCreateDTO;
      const usuarioLibro = await this.usuarioLibroService.createUsuarioLibro(dto);
      res.status(201).json(usuarioLibro);
    } catch (error) {
      res.status(500).json({ error: 'Error creating usuarioLibro' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const usuarioLibro = await this.usuarioLibroService.getUsuarioLibroById(id);
      if (!usuarioLibro) {
        res.status(404).json({ error: 'UsuarioLibro not found' });
        return;
      }
      res.json(usuarioLibro);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching usuarioLibro' });
    }
  }

  async getByUsuario(req: Request, res: Response): Promise<void> {
    try {
      const id_usuario = parseInt(req.params.id_usuario, 10);
      const libros = await this.usuarioLibroService.getLibrosByUsuario(id_usuario);
      res.json(libros);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching libros' });
    }
  }

  async getByLibro(req: Request, res: Response): Promise<void> {
    try {
      const id_libro = parseInt(req.params.id_libro, 10);
      const usuarios = await this.usuarioLibroService.getUsuariosByLibro(id_libro);
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching usuarios' });
    }
  }

  async getRelacion(req: Request, res: Response): Promise<void> {
    try {
      const id_usuario = parseInt(req.params.id_usuario, 10);
      const id_libro = parseInt(req.params.id_libro, 10);
      const relacion = await this.usuarioLibroService.getRelacion(id_usuario, id_libro);
      if (!relacion) {
        res.status(404).json({ error: 'Relacion not found' });
        return;
      }
      res.json(relacion);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching relacion' });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const dto = req.body as UsuarioLibroUpdateDTO;
      const usuarioLibro = await this.usuarioLibroService.updateUsuarioLibro(id, dto);
      res.json(usuarioLibro);
    } catch (error) {
      res.status(500).json({ error: 'Error updating usuarioLibro' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const success = await this.usuarioLibroService.deleteUsuarioLibro(id);
      if (!success) {
        res.status(404).json({ error: 'UsuarioLibro not found' });
        return;
      }
      res.json({ message: 'UsuarioLibro deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting usuarioLibro' });
    }
  }
}
