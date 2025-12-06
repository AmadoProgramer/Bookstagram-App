import { Repository } from 'typeorm';
import { OpinionLikePort } from '../../domain/opinionLike/OpinionLikePort';
import { OpinionLike } from '../../domain/opinionLike/OpinionLike';
import { OpinionLikeEntity } from '../entities/OpinionLikeEntity';

export class OpinionLikeAdapter implements OpinionLikePort {
  constructor(private opinionLikeRepository: Repository<OpinionLikeEntity>) {}

  async create(opinionLike: OpinionLike): Promise<OpinionLike> {
    const entity = this.opinionLikeRepository.create(opinionLike);
    const saved = await this.opinionLikeRepository.save(entity);
    return this.toDomain(saved);
  }

  async findById(id: number): Promise<OpinionLike | null> {
    const entity = await this.opinionLikeRepository.findOne({ where: { id_like: id } });
    return entity ? this.toDomain(entity) : null;
  }

  async findByOpinion(id_opinion: number): Promise<OpinionLike[]> {
    const entities = await this.opinionLikeRepository.find({ where: { id_opinion } });
    return entities.map((e) => this.toDomain(e));
  }

  async findByUsuario(id_usuario: number): Promise<OpinionLike[]> {
    const entities = await this.opinionLikeRepository.find({ where: { id_usuario } });
    return entities.map((e) => this.toDomain(e));
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.opinionLikeRepository.delete({ id_like: id });
    return (result.affected ?? 0) > 0;
  }

  async deleteByOpinionAndUsuario(id_opinion: number, id_usuario: number): Promise<boolean> {
    const result = await this.opinionLikeRepository.delete({ id_opinion, id_usuario });
    return (result.affected ?? 0) > 0;
  }

  async exists(id_opinion: number, id_usuario: number): Promise<boolean> {
    const count = await this.opinionLikeRepository.count({ where: { id_opinion, id_usuario } });
    return count > 0;
  }

  private toDomain(entity: OpinionLikeEntity): OpinionLike {
    return {
      id_like: entity.id_like,
      id_opinion: entity.id_opinion,
      id_usuario: entity.id_usuario,
      fecha_creacion: entity.fecha,
    };
  }
}
