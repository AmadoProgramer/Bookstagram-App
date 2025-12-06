import { Repository } from 'typeorm';
import { OpinionPort } from '../../domain/opinion/OpinionPort';
import { Opinion } from '../../domain/opinion/Opinion';
import { OpinionEntity } from '../entities/OpinionEntity';

export class OpinionAdapter implements OpinionPort {
  constructor(private opinionRepository: Repository<OpinionEntity>) {}

  async create(opinion: Opinion): Promise<Opinion> {
    const entity = this.opinionRepository.create(opinion);
    const saved = await this.opinionRepository.save(entity);
    return this.toDomain(saved);
  }

  async findById(id: number): Promise<Opinion | null> {
    const entity = await this.opinionRepository.findOne({ where: { id_opinion: id } });
    return entity ? this.toDomain(entity) : null;
  }

  async findByUsuario(id_usuario: number): Promise<Opinion[]> {
    const entities = await this.opinionRepository.find({ where: { id_usuario } });
    return entities.map((e) => this.toDomain(e));
  }

  async findByLibro(id_libro: number): Promise<Opinion[]> {
    const entities = await this.opinionRepository.find({ where: { id_libro } });
    return entities.map((e) => this.toDomain(e));
  }

  async findAll(): Promise<Opinion[]> {
    const entities = await this.opinionRepository.find();
    return entities.map((e) => this.toDomain(e));
  }

  async update(id: number, opinion: Partial<Opinion>): Promise<Opinion> {
    await this.opinionRepository.update({ id_opinion: id }, opinion);
    const updated = await this.findById(id);
    return updated!;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.opinionRepository.delete({ id_opinion: id });
    return (result.affected ?? 0) > 0;
  }

  private toDomain(entity: OpinionEntity): Opinion {
    return {
      id_opinion: entity.id_opinion,
      id_usuario: entity.id_usuario,
      id_libro: entity.id_libro,
      texto: entity.texto,
      puntuacion: entity.puntuacion,
      fecha_creacion: entity.fecha,
    };
  }
}
