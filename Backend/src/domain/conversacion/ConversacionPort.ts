import { Conversacion } from './Conversacion';

export interface ConversacionPort {
  create(conversacion: Conversacion): Promise<Conversacion>;
  findById(id: number): Promise<Conversacion | null>;
  findByUsuarios(id_usuario1: number, id_usuario2: number): Promise<Conversacion | null>;
  findByUsuario(id_usuario: number): Promise<Conversacion[]>;
  delete(id: number): Promise<boolean>;
}
