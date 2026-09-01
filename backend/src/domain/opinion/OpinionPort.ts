import { Opinion } from './Opinion';

export interface OpinionPort {
  create(opinion: Opinion): Promise<Opinion>;
  findById(id: number): Promise<Opinion | null>;
  findByUsuario(id_usuario: number): Promise<Opinion[]>;
  findByLibro(id_libro: number): Promise<Opinion[]>;
  findAll(): Promise<Opinion[]>;
  update(id: number, opinion: Partial<Opinion>): Promise<Opinion>;
  delete(id: number): Promise<boolean>;
}
