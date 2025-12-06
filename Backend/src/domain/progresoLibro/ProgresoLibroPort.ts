import { ProgresoLibro } from './ProgresoLibro';

export interface ProgresoLibroPort {
  create(progreso: ProgresoLibro): Promise<ProgresoLibro>;
  findById(id: number): Promise<ProgresoLibro | null>;
  findByUsuarioAndLibro(id_usuario: number, id_libro: number): Promise<ProgresoLibro | null>;
  findByUsuario(id_usuario: number): Promise<ProgresoLibro[]>;
  findByLibro(id_libro: number): Promise<ProgresoLibro[]>;
  findAll(): Promise<ProgresoLibro[]>;
  update(id: number, progreso: Partial<ProgresoLibro>): Promise<ProgresoLibro>;
  delete(id: number): Promise<boolean>;
}
