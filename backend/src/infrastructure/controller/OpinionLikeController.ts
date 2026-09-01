import { Request, Response } from 'express';
import { OpinionLikeService } from '../../application/services/OpinionLikeService';
import { OpinionLikeCreateDTO } from '../../application/dtos/opinionLike/OpinionLikeCreateDTO';

export class OpinionLikeController {
  constructor(private opinionLikeService: OpinionLikeService) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const dto = req.body as OpinionLikeCreateDTO;
      const like = await this.opinionLikeService.createOpinionLike(dto);
      res.status(201).json(like);
    } catch (error) {
      res.status(500).json({ error: 'Error creating like' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const like = await this.opinionLikeService.getOpinionLikeById(id);
      if (!like) {
        res.status(404).json({ error: 'Like not found' });
        return;
      }
      res.json(like);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching like' });
    }
  }

  async getByOpinion(req: Request, res: Response): Promise<void> {
    try {
      const id_opinion = parseInt(req.params.id_opinion, 10);
      const likes = await this.opinionLikeService.getLikesByOpinion(id_opinion);
      res.json(likes);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching likes' });
    }
  }

  async getByUsuario(req: Request, res: Response): Promise<void> {
    try {
      const id_usuario = parseInt(req.params.id_usuario, 10);
      const likes = await this.opinionLikeService.getLikesByUsuario(id_usuario);
      res.json(likes);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching likes' });
    }
  }

  async toggleLike(req: Request, res: Response): Promise<void> {
    try {
      const id_opinion = parseInt(req.body.id_opinion, 10);
      const id_usuario = parseInt(req.body.id_usuario, 10);
      const result = await this.opinionLikeService.toggleLike(id_opinion, id_usuario);
      res.json(result ? result : { message: 'Like removed' });
    } catch (error) {
      res.status(500).json({ error: 'Error toggling like' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const success = await this.opinionLikeService.deleteOpinionLike(id);
      if (!success) {
        res.status(404).json({ error: 'Like not found' });
        return;
      }
      res.json({ message: 'Like deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting like' });
    }
  }
}
