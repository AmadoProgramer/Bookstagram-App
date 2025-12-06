import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany, ForeignKey } from 'typeorm';
import { UsuarioEntity } from './UsuarioEntity';
import { LibroEntity } from './LibroEntity';
import { OpinionLikeEntity } from './OpinionLikeEntity';

@Entity('opinion')
export class OpinionEntity {
  @PrimaryGeneratedColumn()
  id_opinion!: number;

  @Column({ type: 'int' })
  id_usuario!: number;

  @Column({ type: 'int' })
  id_libro!: number;

  @Column({ type: 'text' })
  texto!: string;

  @Column({ type: 'int' })
  puntuacion!: number;

  @CreateDateColumn({ name: 'fecha' })
  fecha!: Date;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.opiniones, { onDelete: 'CASCADE' })
  usuario!: UsuarioEntity;

  @ManyToOne(() => LibroEntity, (libro) => libro.opiniones, { onDelete: 'CASCADE' })
  libro!: LibroEntity;

  @OneToMany(() => OpinionLikeEntity, (like) => like.opinion, { cascade: true })
  likes!: OpinionLikeEntity[];
}
