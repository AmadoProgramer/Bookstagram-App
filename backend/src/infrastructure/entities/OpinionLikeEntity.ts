import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { OpinionEntity } from './OpinionEntity';
import { UsuarioEntity } from './UsuarioEntity';

@Entity('opinionlike')
export class OpinionLikeEntity {
  @PrimaryGeneratedColumn()
  id_like!: number;

  @Column({ type: 'int' })
  id_opinion!: number;

  @Column({ type: 'int' })
  id_usuario!: number;

  @CreateDateColumn({ name: 'fecha' })
  fecha!: Date;

  @ManyToOne(() => OpinionEntity, (opinion) => opinion.likes, { onDelete: 'CASCADE' })
  opinion!: OpinionEntity;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.likes, { onDelete: 'CASCADE' })
  usuario!: UsuarioEntity;
}
