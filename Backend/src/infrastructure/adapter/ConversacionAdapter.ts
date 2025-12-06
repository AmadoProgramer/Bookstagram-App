import { Repository } from 'typeorm';
import { ConversacionPort } from '../../domain/conversacion/ConversacionPort';
import { Conversacion } from '../../domain/conversacion/Conversacion';
import { ConversacionEntity } from '../entities/ConversacionEntity';

export class ConversacionAdapter implements ConversacionPort {
  constructor(private conversacionRepository: Repository<ConversacionEntity>) {}

  async create(conversacion: Conversacion): Promise<Conversacion> {
    const entity = this.conversacionRepository.create(conversacion);
    const saved = await this.conversacionRepository.save(entity);
    return this.toDomain(saved);
  }

  async findById(id: number): Promise<Conversacion | null> {
    const entity = await this.conversacionRepository.findOne({ where: { id_conversacion: id } });
    return entity ? this.toDomain(entity) : null;
  }

  async findByUsuarios(id_usuario1: number, id_usuario2: number): Promise<Conversacion | null> {
    const entity = await this.conversacionRepository
      .createQueryBuilder('conversacion')
      .where(
        '(conversacion.id_usuario1 = :id_usuario1 AND conversacion.id_usuario2 = :id_usuario2) OR (conversacion.id_usuario1 = :id_usuario2 AND conversacion.id_usuario2 = :id_usuario1)',
        { id_usuario1, id_usuario2 },
      )
      .getOne();

    return entity ? this.toDomain(entity) : null;
  }

  async findByUsuario(id_usuario: number): Promise<Conversacion[]> {
    const entities = await this.conversacionRepository
      .createQueryBuilder('conversacion')
      .where('conversacion.id_usuario1 = :id_usuario OR conversacion.id_usuario2 = :id_usuario', {
        id_usuario,
      })
      .getMany();

    return entities.map((e) => this.toDomain(e));
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.conversacionRepository.delete({ id_conversacion: id });
    return (result.affected ?? 0) > 0;
  }

  private toDomain(entity: ConversacionEntity): Conversacion {
    return {
      id_conversacion: entity.id_conversacion,
      id_usuario1: entity.id_usuario1,
      id_usuario2: entity.id_usuario2,
      fecha_creacion: entity.fecha_creacion,
    };
  }
}
