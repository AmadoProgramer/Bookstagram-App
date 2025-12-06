import { MensajePort } from '../../domain/mensaje/MensajePort';
import { MensajeCreateDTO } from '../dtos/mensaje/MensajeCreateDTO';
import { MensajeResponseDTO } from '../dtos/mensaje/MensajeResponseDTO';
import { MensajeUpdateDTO } from '../dtos/mensaje/MensajeUpdateDTO';
import { Mensaje } from '../../domain/mensaje/Mensaje';

export class MensajeService {
  constructor(private mensajePort: MensajePort) {}

  async createMensaje(dto: MensajeCreateDTO): Promise<MensajeResponseDTO> {
    const mensaje: Mensaje = {
      id_mensaje: 0,
      ...dto,
      fecha_creacion: new Date(),
    };

    const created = await this.mensajePort.create(mensaje);
    return this.toDTO(created);
  }

  async getMensajeById(id: number): Promise<MensajeResponseDTO | null> {
    const mensaje = await this.mensajePort.findById(id);
    return mensaje ? this.toDTO(mensaje) : null;
  }

  async getMensajesByConversacion(id_conversacion: number): Promise<MensajeResponseDTO[]> {
    const mensajes = await this.mensajePort.findByConversacion(id_conversacion);
    return mensajes.map((m) => this.toDTO(m));
  }

  async deleteMensaje(id: number): Promise<boolean> {
    return await this.mensajePort.delete(id);
  }

  private toDTO(mensaje: Mensaje): MensajeResponseDTO {
    const dto = new MensajeResponseDTO();
    Object.assign(dto, mensaje);
    return dto;
  }
}
