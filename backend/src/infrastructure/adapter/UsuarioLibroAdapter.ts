import { Repository } from 'typeorm';
import { UsuarioLibroPort } from '../../domain/usuarioLibro/UsuarioLibroPort';
import { UsuarioLibro } from '../../domain/usuarioLibro/UsuarioLibro';
import { UsuarioLibroEntity } from '../entities/UsuarioLibroEntity';

export class UsuarioLibroAdapter implements UsuarioLibroPort {
  constructor(private usuarioLibroRepository: Repository<UsuarioLibroEntity>) {}

  async create(usuarioLibro: UsuarioLibro): Promise<UsuarioLibro> {
    const entity = this.usuarioLibroRepository.create(usuarioLibro);
    const saved = await this.usuarioLibroRepository.save(entity);
    return this.toDomain(saved);
  }

  async findById(id: number): Promise<UsuarioLibro | null> {
    const entity = await this.usuarioLibroRepository.findOne({ where: { id_usuario_libro: id } });
    return entity ? this.toDomain(entity) : null;
  }

  async findByUsuario(id_usuario: number): Promise<UsuarioLibro[]> {
    const entities = await this.usuarioLibroRepository.find({ where: { id_usuario } });
    return entities.map((e) => this.toDomain(e));
  }

  async findByLibro(id_libro: number): Promise<UsuarioLibro[]> {
    const entities = await this.usuarioLibroRepository.find({ where: { id_libro } });
    return entities.map((e) => this.toDomain(e));
  }

  async findByUsuarioAndLibro(id_usuario: number, id_libro: number): Promise<UsuarioLibro | null> {
    const entity = await this.usuarioLibroRepository.findOne({
      where: { id_usuario, id_libro },
    });
    return entity ? this.toDomain(entity) : null;
  }

  async update(id: number, usuarioLibro: Partial<UsuarioLibro>): Promise<UsuarioLibro> {
    await this.usuarioLibroRepository.update({ id_usuario_libro: id }, usuarioLibro);
    const updated = await this.findById(id);
    return updated!;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.usuarioLibroRepository.delete({ id_usuario_libro: id });
    return (result.affected ?? 0) > 0;
  }

  private toDomain(entity: UsuarioLibroEntity): UsuarioLibro {
    return {
      id_usuario_libro: entity.id_usuario_libro,
      id_usuario: entity.id_usuario,
      id_libro: entity.id_libro,
      estado: entity.estado,
      fecha_inicio: entity.fecha_inicio,
      fecha_fin: entity.fecha_fin || undefined,
    };
  }
}
