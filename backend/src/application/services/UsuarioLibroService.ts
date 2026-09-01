import { UsuarioLibroPort } from '../../domain/usuarioLibro/UsuarioLibroPort';
import { UsuarioLibroCreateDTO } from '../dtos/usuarioLibro/UsuarioLibroCreateDTO';
import { UsuarioLibroResponseDTO } from '../dtos/usuarioLibro/UsuarioLibroResponseDTO';
import { UsuarioLibroUpdateDTO } from '../dtos/usuarioLibro/UsuarioLibroUpdateDTO';
import { UsuarioLibro } from '../../domain/usuarioLibro/UsuarioLibro';

export class UsuarioLibroService {
  constructor(private usuarioLibroPort: UsuarioLibroPort) {}

  async createUsuarioLibro(dto: UsuarioLibroCreateDTO): Promise<UsuarioLibroResponseDTO> {
    const usuarioLibro: UsuarioLibro = {
      id_usuario_libro: 0,
      ...dto,
      fecha_inicio: dto.fecha_inicio || new Date(),
    };

    const created = await this.usuarioLibroPort.create(usuarioLibro);
    return this.toDTO(created);
  }

  async getUsuarioLibroById(id: number): Promise<UsuarioLibroResponseDTO | null> {
    const usuarioLibro = await this.usuarioLibroPort.findById(id);
    return usuarioLibro ? this.toDTO(usuarioLibro) : null;
  }

  async getLibrosByUsuario(id_usuario: number): Promise<UsuarioLibroResponseDTO[]> {
    const libros = await this.usuarioLibroPort.findByUsuario(id_usuario);
    return libros.map((l) => this.toDTO(l));
  }

  async getUsuariosByLibro(id_libro: number): Promise<UsuarioLibroResponseDTO[]> {
    const usuarios = await this.usuarioLibroPort.findByLibro(id_libro);
    return usuarios.map((u) => this.toDTO(u));
  }

  async getRelacion(id_usuario: number, id_libro: number): Promise<UsuarioLibroResponseDTO | null> {
    const relacion = await this.usuarioLibroPort.findByUsuarioAndLibro(id_usuario, id_libro);
    return relacion ? this.toDTO(relacion) : null;
  }

  async updateUsuarioLibro(id: number, dto: UsuarioLibroUpdateDTO): Promise<UsuarioLibroResponseDTO> {
    const updated = await this.usuarioLibroPort.update(id, dto);
    return this.toDTO(updated);
  }

  async deleteUsuarioLibro(id: number): Promise<boolean> {
    return await this.usuarioLibroPort.delete(id);
  }

  private toDTO(usuarioLibro: UsuarioLibro): UsuarioLibroResponseDTO {
    const dto = new UsuarioLibroResponseDTO();
    Object.assign(dto, usuarioLibro);
    return dto;
  }
}
