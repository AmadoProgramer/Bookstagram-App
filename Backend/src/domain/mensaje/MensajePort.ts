import { Mensaje } from './Mensaje';

export interface MensajePort {
  create(mensaje: Mensaje): Promise<Mensaje>;
  findById(id: number): Promise<Mensaje | null>;
  findByConversacion(id_conversacion: number): Promise<Mensaje[]>;
  delete(id: number): Promise<boolean>;
}
