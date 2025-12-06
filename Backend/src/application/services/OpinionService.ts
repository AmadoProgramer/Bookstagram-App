import { OpinionPort } from '../../domain/opinion/OpinionPort';
import { OpinionCreateDTO } from '../dtos/opinion/OpinionCreateDTO';
import { OpinionResponseDTO } from '../dtos/opinion/OpinionResponseDTO';
import { OpinionUpdateDTO } from '../dtos/opinion/OpinionUpdateDTO';
import { Opinion } from '../../domain/opinion/Opinion';

export class OpinionService {
  constructor(private opinionPort: OpinionPort) {}

  async createOpinion(dto: OpinionCreateDTO): Promise<OpinionResponseDTO> {
    const opinion: Opinion = {
      id_opinion: 0,
      ...dto,
      fecha_creacion: new Date(),
    };

    const created = await this.opinionPort.create(opinion);
    return this.toDTO(created);
  }

  async getOpinionById(id: number): Promise<OpinionResponseDTO | null> {
    const opinion = await this.opinionPort.findById(id);
    return opinion ? this.toDTO(opinion) : null;
  }

  async getOpinionesByUsuario(id_usuario: number): Promise<OpinionResponseDTO[]> {
    const opiniones = await this.opinionPort.findByUsuario(id_usuario);
    return opiniones.map((o) => this.toDTO(o));
  }

  async getOpinionesByLibro(id_libro: number): Promise<OpinionResponseDTO[]> {
    const opiniones = await this.opinionPort.findByLibro(id_libro);
    return opiniones.map((o) => this.toDTO(o));
  }

  async getAllOpiniones(): Promise<OpinionResponseDTO[]> {
    const opiniones = await this.opinionPort.findAll();
    return opiniones.map((o) => this.toDTO(o));
  }

  async updateOpinion(id: number, dto: OpinionUpdateDTO): Promise<OpinionResponseDTO> {
    const updated = await this.opinionPort.update(id, dto);
    return this.toDTO(updated);
  }

  async deleteOpinion(id: number): Promise<boolean> {
    return await this.opinionPort.delete(id);
  }

  private toDTO(opinion: Opinion): OpinionResponseDTO {
    const dto = new OpinionResponseDTO();
    Object.assign(dto, opinion);
    return dto;
  }
}
