import { OpinionLike } from './OpinionLike';

export interface OpinionLikePort {
  create(opinionLike: OpinionLike): Promise<OpinionLike>;
  findById(id: number): Promise<OpinionLike | null>;
  findByOpinion(id_opinion: number): Promise<OpinionLike[]>;
  findByUsuario(id_usuario: number): Promise<OpinionLike[]>;
  delete(id: number): Promise<boolean>;
  deleteByOpinionAndUsuario(id_opinion: number, id_usuario: number): Promise<boolean>;
  exists(id_opinion: number, id_usuario: number): Promise<boolean>;
}
