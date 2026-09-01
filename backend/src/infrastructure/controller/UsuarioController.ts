import { Request, Response } from 'express';
import { UsuarioService } from '../../application/services/UsuarioService';
import { AuthService } from '../../application/services/AuthService';
import { UsuarioCreateDTO } from '../../application/dtos/usuario/UsuarioCreateDTO';
import { UsuarioUpdateDTO } from '../../application/dtos/usuario/UsuarioUpdateDTO';

export class UsuarioController {
  constructor(private usuarioService: UsuarioService, private authService: AuthService) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const dto = req.body as UsuarioCreateDTO;
      dto.password = await this.authService.hashPassword(dto.password);
      const usuario = await this.usuarioService.createUsuario(dto);
      res.status(201).json(usuario);
    } catch (error) {
      res.status(500).json({ error: 'Error creating usuario' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const usuario = await this.usuarioService.getUsuarioById(id);
      if (!usuario) {
        res.status(404).json({ error: 'Usuario not found' });
        return;
      }
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching usuario' });
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const usuarios = await this.usuarioService.getAllUsuarios();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching usuarios' });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const dto = req.body as UsuarioUpdateDTO;
      const usuario = await this.usuarioService.updateUsuario(id, dto);
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error: 'Error updating usuario' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const success = await this.usuarioService.deleteUsuario(id);
      if (!success) {
        res.status(404).json({ error: 'Usuario not found' });
        return;
      }
      res.json({ message: 'Usuario deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting usuario' });
    }
  }

  async follow(req: Request, res: Response): Promise<void> {
    try {
      const usuarioId = parseInt(req.params.usuarioId, 10);
      const followId = parseInt(req.params.followId, 10);
      await this.usuarioService.followUsuario(usuarioId, followId);
      res.json({ message: 'Followed successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error following usuario' });
    }
  }

  async unfollow(req: Request, res: Response): Promise<void> {
    try {
      const usuarioId = parseInt(req.params.usuarioId, 10);
      const followId = parseInt(req.params.followId, 10);
      await this.usuarioService.unfollowUsuario(usuarioId, followId);
      res.json({ message: 'Unfollowed successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error unfollowing usuario' });
    }
  }

  async getFollowers(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const followers = await this.usuarioService.getFollowers(id);
      res.json(followers);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching followers' });
    }
  }

  async getFollowing(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const following = await this.usuarioService.getFollowing(id);
      res.json(following);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching following' });
    }
  }
}
