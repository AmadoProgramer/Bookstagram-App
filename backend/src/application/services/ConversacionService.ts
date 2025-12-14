import { ConversacionPort } from '../../domain/conversacion/ConversacionPort';
import { ConversacionCreateDTO } from '../dtos/conversacion/ConversacionCreateDTO';
import { ConversacionResponseDTO } from '../dtos/conversacion/ConversacionResponseDTO';
import { Conversacion } from '../../domain/conversacion/Conversacion';

export class ConversacionService {
  constructor(private conversacionPort: ConversacionPort) {}

  async createConversacion(dto: ConversacionCreateDTO): Promise<ConversacionResponseDTO> {
    const conversacion: Conversacion = {
      id_conversacion: 0,
      ...dto,
      fecha_creacion: new Date(),
    };

    const created = await this.conversacionPort.create(conversacion);
    return this.toDTO(created);
  }

  async getConversacionById(id: number): Promise<ConversacionResponseDTO | null> {
    const conversacion = await this.conversacionPort.findById(id);
    return conversacion ? this.toDTO(conversacion) : null;
  }

  async getConversacionByUsuarios(id_usuario1: number, id_usuario2: number): Promise<ConversacionResponseDTO | null> {
    const conversacion = await this.conversacionPort.findByUsuarios(id_usuario1, id_usuario2);
    return conversacion ? this.toDTO(conversacion) : null;
  }

  async getConversacionesByUsuario(id_usuario: number): Promise<ConversacionResponseDTO[]> {
    const conversaciones = await this.conversacionPort.findByUsuario(id_usuario);
    return conversaciones.map((c) => this.toDTO(c));
  }

  async deleteConversacion(id: number): Promise<boolean> {
    return await this.conversacionPort.delete(id);
  }

  private toDTO(conversacion: Conversacion): ConversacionResponseDTO {
    const dto = new ConversacionResponseDTO();
    Object.assign(dto, conversacion);
    return dto;
  }
}
