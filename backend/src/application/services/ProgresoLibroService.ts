import { ProgresoLibroPort } from '../../domain/progresoLibro/ProgresoLibroPort';
import { ProgresoLibroCreateDTO } from '../dtos/progresoLibro/ProgresoLibroCreateDTO';
import { ProgresoLibroResponseDTO } from '../dtos/progresoLibro/ProgresoLibroResponseDTO';
import { ProgresoLibroUpdateDTO } from '../dtos/progresoLibro/ProgresoLibroUpdateDTO';
import { ProgresoLibro } from '../../domain/progresoLibro/ProgresoLibro';

export class ProgresoLibroService {
  constructor(private progresoLibroPort: ProgresoLibroPort) {}

  async createProgresoLibro(dto: ProgresoLibroCreateDTO): Promise<ProgresoLibroResponseDTO> {
    const progreso: ProgresoLibro = {
      id_progreso: 0,
      ...dto,
      fecha_actualizacion: new Date(),
    };

    const created = await this.progresoLibroPort.create(progreso);
    return this.toDTO(created);
  }

  async getProgresoLibroById(id: number): Promise<ProgresoLibroResponseDTO | null> {
    const progreso = await this.progresoLibroPort.findById(id);
    return progreso ? this.toDTO(progreso) : null;
  }

  async getProgresoByUsuario(id_usuario: number): Promise<ProgresoLibroResponseDTO[]> {
    const progresos = await this.progresoLibroPort.findByUsuario(id_usuario);
    return progresos.map((p) => this.toDTO(p));
  }

  async getProgresoByLibro(id_libro: number): Promise<ProgresoLibroResponseDTO[]> {
    const progresos = await this.progresoLibroPort.findByLibro(id_libro);
    return progresos.map((p) => this.toDTO(p));
  }

  async updateProgresoLibro(id: number, dto: ProgresoLibroUpdateDTO): Promise<ProgresoLibroResponseDTO> {
    const updated = await this.progresoLibroPort.update(id, {
      ...dto,
      fecha_actualizacion: new Date(),
    });
    return this.toDTO(updated);
  }

  async deleteProgresoLibro(id: number): Promise<boolean> {
    return await this.progresoLibroPort.delete(id);
  }

  private toDTO(progreso: ProgresoLibro): ProgresoLibroResponseDTO {
    const dto = new ProgresoLibroResponseDTO();
    Object.assign(dto, progreso);
    return dto;
  }
}
