import { Repository } from 'typeorm';
import { MensajePort } from '../../domain/mensaje/MensajePort';
import { Mensaje } from '../../domain/mensaje/Mensaje';
import { MensajeEntity } from '../entities/MensajeEntity';

export class MensajeAdapter implements MensajePort {
  constructor(private mensajeRepository: Repository<MensajeEntity>) {}

  async create(mensaje: Mensaje): Promise<Mensaje> {
    const entity = this.mensajeRepository.create(mensaje);
    const saved = await this.mensajeRepository.save(entity);
    return this.toDomain(saved);
  }

  async findById(id: number): Promise<Mensaje | null> {
    const entity = await this.mensajeRepository.findOne({ where: { id_mensaje: id } });
    return entity ? this.toDomain(entity) : null;
  }

  async findByConversacion(id_conversacion: number): Promise<Mensaje[]> {
    const entities = await this.mensajeRepository.find({
      where: { id_conversacion },
      order: { fecha: 'ASC' },
    });
    return entities.map((e) => this.toDomain(e));
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.mensajeRepository.delete({ id_mensaje: id });
    return (result.affected ?? 0) > 0;
  }

  private toDomain(entity: MensajeEntity): Mensaje {
    return {
      id_mensaje: entity.id_mensaje,
      id_conversacion: entity.id_conversacion,
      id_usuario_emisor: entity.id_usuario_emisor,
      texto: entity.texto,
      fecha_creacion: entity.fecha,
    };
  }
}
