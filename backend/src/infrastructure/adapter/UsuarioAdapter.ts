import { Repository } from 'typeorm';
import { UsuarioPort } from '../../domain/usuario/UsuarioPort';
import { Usuario } from '../../domain/usuario/Usuario';
import { UsuarioEntity } from '../entities/UsuarioEntity';

export class UsuarioAdapter implements UsuarioPort {
  constructor(private usuarioRepository: Repository<UsuarioEntity>) {}

  async create(usuario: Usuario): Promise<Usuario> {
    const entity = this.usuarioRepository.create(usuario);
    const saved = await this.usuarioRepository.save(entity);
    return this.toDomain(saved);
  }

  async findById(id: number): Promise<Usuario | null> {
    const entity = await this.usuarioRepository.findOne({ where: { id_usuario: id } });
    return entity ? this.toDomain(entity) : null;
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    const entity = await this.usuarioRepository.findOne({ where: { email } });
    return entity ? this.toDomain(entity) : null;
  }

  async findByUsername(username: string): Promise<Usuario | null> {
    const entity = await this.usuarioRepository.findOne({ where: { username } });
    return entity ? this.toDomain(entity) : null;
  }

  async findAll(): Promise<Usuario[]> {
    const entities = await this.usuarioRepository.find();
    return entities.map((e) => this.toDomain(e));
  }

  async update(id: number, usuario: Partial<Usuario>): Promise<Usuario> {
    await this.usuarioRepository.update({ id_usuario: id }, usuario);
    const updated = await this.findById(id);
    return updated!;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.usuarioRepository.delete({ id_usuario: id });
    return (result.affected ?? 0) > 0;
  }

  async findFollowers(id: number): Promise<Usuario[]> {
    // Esta implementación requeriría una tabla de relaciones de seguimiento
    // Por ahora retorna un array vacío
    return [];
  }

  async findFollowing(id: number): Promise<Usuario[]> {
    // Esta implementación requeriría una tabla de relaciones de seguimiento
    // Por ahora retorna un array vacío
    return [];
  }

  async follow(usuarioId: number, followId: number): Promise<void> {
    // Implementar lógica de seguimiento con tabla de relaciones
  }

  async unfollow(usuarioId: number, followId: number): Promise<void> {
    // Implementar lógica de dejar de seguir con tabla de relaciones
  }

  private toDomain(entity: UsuarioEntity): Usuario {
    return {
      id_usuario: entity.id_usuario,
      nombre: entity.nombre,
      email: entity.email,
      username: entity.username,
      password: entity.password,
      bio: entity.bio,
      avatar_url: entity.avatar_url,
      xp: entity.xp,
      seguidores: entity.seguidores,
      seguidos: entity.seguidos,
      fecha_creacion: entity.fecha_creacion,
    };
  }
}
