import { Usuario } from './Usuario';

export interface UsuarioPort {
  create(usuario: Usuario): Promise<Usuario>;
  findById(id: number): Promise<Usuario | null>;
  findByEmail(email: string): Promise<Usuario | null>;
  findByUsername(username: string): Promise<Usuario | null>;
  findAll(): Promise<Usuario[]>;
  update(id: number, usuario: Partial<Usuario>): Promise<Usuario>;
  delete(id: number): Promise<boolean>;
  findFollowers(id: number): Promise<Usuario[]>;
  findFollowing(id: number): Promise<Usuario[]>;
  follow(usuarioId: number, followId: number): Promise<void>;
  unfollow(usuarioId: number, followId: number): Promise<void>;
}
