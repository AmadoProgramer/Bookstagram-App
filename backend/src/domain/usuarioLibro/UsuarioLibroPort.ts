import { UsuarioLibro } from './UsuarioLibro';

export interface UsuarioLibroPort {
  create(usuarioLibro: UsuarioLibro): Promise<UsuarioLibro>;
  findById(id: number): Promise<UsuarioLibro | null>;
  findByUsuario(id_usuario: number): Promise<UsuarioLibro[]>;
  findByLibro(id_libro: number): Promise<UsuarioLibro[]>;
  findByUsuarioAndLibro(id_usuario: number, id_libro: number): Promise<UsuarioLibro | null>;
  update(id: number, usuarioLibro: Partial<UsuarioLibro>): Promise<UsuarioLibro>;
  delete(id: number): Promise<boolean>;
}
