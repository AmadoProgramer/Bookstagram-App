import { Repository } from 'typeorm';
import { ProgresoLibroPort } from '../../domain/progresoLibro/ProgresoLibroPort';
import { ProgresoLibro } from '../../domain/progresoLibro/ProgresoLibro';
import { ProgresoLibroEntity } from '../entities/ProgresoLibroEntity';

export class ProgresoLibroAdapter implements ProgresoLibroPort {
  constructor(private progresoLibroRepository: Repository<ProgresoLibroEntity>) {}

  async create(progreso: ProgresoLibro): Promise<ProgresoLibro> {
    const entity = this.progresoLibroRepository.create(progreso);
    const saved = await this.progresoLibroRepository.save(entity);
    return this.toDomain(saved);
  }

  async findById(id: number): Promise<ProgresoLibro | null> {
    const entity = await this.progresoLibroRepository.findOne({
      where: { id_progreso: id },
      relations: ['usuarioLibro'],
    });
    return entity ? this.toDomain(entity) : null;
  }

  async findByUsuarioAndLibro(id_usuario: number, id_libro: number): Promise<ProgresoLibro | null> {
    const entity = await this.progresoLibroRepository.findOne({
      where: {
        usuarioLibro: { id_usuario, id_libro },
      },
      relations: ['usuarioLibro'],
    });
    return entity ? this.toDomain(entity) : null;
  }

  async findByUsuario(id_usuario: number): Promise<ProgresoLibro[]> {
    const entities = await this.progresoLibroRepository.find({
      where: { usuarioLibro: { id_usuario } },
      relations: ['usuarioLibro'],
    });
    return entities.map((e) => this.toDomain(e));
  }

  async findByLibro(id_libro: number): Promise<ProgresoLibro[]> {
    const entities = await this.progresoLibroRepository.find({
      where: { usuarioLibro: { id_libro } },
      relations: ['usuarioLibro'],
    });
    return entities.map((e) => this.toDomain(e));
  }

  async findAll(): Promise<ProgresoLibro[]> {
    const entities = await this.progresoLibroRepository.find({
      relations: ['usuarioLibro'],
    });
    return entities.map((e) => this.toDomain(e));
  }

  async update(id: number, progreso: Partial<ProgresoLibro>): Promise<ProgresoLibro> {
    await this.progresoLibroRepository.update({ id_progreso: id }, progreso);
    const updated = await this.findById(id);
    return updated!;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.progresoLibroRepository.delete({ id_progreso: id });
    return (result.affected ?? 0) > 0;
  }

  private toDomain(entity: ProgresoLibroEntity): ProgresoLibro {
    return {
      id_progreso: entity.id_progreso,
      id_usuario_libro: entity.id_usuario_libro,
      porcentaje: entity.porcentaje,
      capitulos_leidos: entity.capitulos_leidos,
      fecha_actualizacion: entity.fecha_actualizacion,
    };
  }
}
