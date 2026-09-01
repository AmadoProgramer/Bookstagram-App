import { UsuarioPort } from '../../domain/usuario/UsuarioPort';
import { UsuarioCreateDTO } from '../dtos/usuario/UsuarioCreateDTO';
import { UsuarioResponseDTO } from '../dtos/usuario/UsuarioResponseDTO';
import { UsuarioUpdateDTO } from '../dtos/usuario/UsuarioUpdateDTO';
import { Usuario } from '../../domain/usuario/Usuario';

export class UsuarioService {
  constructor(private usuarioPort: UsuarioPort) {}

  async createUsuario(dto: UsuarioCreateDTO): Promise<UsuarioResponseDTO> {
    const usuario: Usuario = {
      id_usuario: 0,
      ...dto,
      xp: 0,
      seguidores: 0,
      seguidos: 0,
      fecha_creacion: new Date(),
    };

    const created = await this.usuarioPort.create(usuario);
    return this.toDTO(created);
  }

  async getUsuarioById(id: number): Promise<UsuarioResponseDTO | null> {
    const usuario = await this.usuarioPort.findById(id);
    return usuario ? this.toDTO(usuario) : null;
  }

  async getAllUsuarios(): Promise<UsuarioResponseDTO[]> {
    const usuarios = await this.usuarioPort.findAll();
    return usuarios.map((u) => this.toDTO(u));
  }

  async updateUsuario(id: number, dto: UsuarioUpdateDTO): Promise<UsuarioResponseDTO> {
    const updated = await this.usuarioPort.update(id, dto);
    return this.toDTO(updated);
  }

  async deleteUsuario(id: number): Promise<boolean> {
    return await this.usuarioPort.delete(id);
  }

  async followUsuario(usuarioId: number, followId: number): Promise<void> {
    await this.usuarioPort.follow(usuarioId, followId);
  }

  async unfollowUsuario(usuarioId: number, followId: number): Promise<void> {
    await this.usuarioPort.unfollow(usuarioId, followId);
  }

  async getFollowers(id: number): Promise<UsuarioResponseDTO[]> {
    const followers = await this.usuarioPort.findFollowers(id);
    return followers.map((u) => this.toDTO(u));
  }

  async getFollowing(id: number): Promise<UsuarioResponseDTO[]> {
    const following = await this.usuarioPort.findFollowing(id);
    return following.map((u) => this.toDTO(u));
  }

  private toDTO(usuario: Usuario): UsuarioResponseDTO {
    const dto = new UsuarioResponseDTO();
    Object.assign(dto, usuario);
    return dto;
  }
}
