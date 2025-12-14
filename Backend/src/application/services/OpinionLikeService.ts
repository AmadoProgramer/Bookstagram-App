import { OpinionLikePort } from '../../domain/opinionLike/OpinionLikePort';
import { OpinionLikeCreateDTO } from '../dtos/opinionLike/OpinionLikeCreateDTO';
import { OpinionLikeResponseDTO } from '../dtos/opinionLike/OpinionLikeResponseDTO';
import { OpinionLike } from '../../domain/opinionLike/OpinionLike';

export class OpinionLikeService {
  constructor(private opinionLikePort: OpinionLikePort) {}

  async createOpinionLike(dto: OpinionLikeCreateDTO): Promise<OpinionLikeResponseDTO> {
    const opinionLike: OpinionLike = {
      id_like: 0,
      ...dto,
      fecha_creacion: new Date(),
    };

    const created = await this.opinionLikePort.create(opinionLike);
    return this.toDTO(created);
  }

  async getOpinionLikeById(id: number): Promise<OpinionLikeResponseDTO | null> {
    const opinionLike = await this.opinionLikePort.findById(id);
    return opinionLike ? this.toDTO(opinionLike) : null;
  }

  async getLikesByOpinion(id_opinion: number): Promise<OpinionLikeResponseDTO[]> {
    const likes = await this.opinionLikePort.findByOpinion(id_opinion);
    return likes.map((l) => this.toDTO(l));
  }

  async getLikesByUsuario(id_usuario: number): Promise<OpinionLikeResponseDTO[]> {
    const likes = await this.opinionLikePort.findByUsuario(id_usuario);
    return likes.map((l) => this.toDTO(l));
  }

  async deleteOpinionLike(id: number): Promise<boolean> {
    return await this.opinionLikePort.delete(id);
  }

  async toggleLike(id_opinion: number, id_usuario: number): Promise<OpinionLikeResponseDTO | null> {
    const exists = await this.opinionLikePort.exists(id_opinion, id_usuario);

    if (exists) {
      await this.opinionLikePort.deleteByOpinionAndUsuario(id_opinion, id_usuario);
      return null;
    } else {
      const opinionLike: OpinionLike = {
        id_like: 0,
        id_opinion,
        id_usuario,
        fecha_creacion: new Date(),
      };
      const created = await this.opinionLikePort.create(opinionLike);
      return this.toDTO(created);
    }
  }

  private toDTO(opinionLike: OpinionLike): OpinionLikeResponseDTO {
    const dto = new OpinionLikeResponseDTO();
    Object.assign(dto, opinionLike);
    return dto;
  }
}
