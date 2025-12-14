import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { OpinionEntity } from './OpinionEntity';
import { UsuarioLibroEntity } from './UsuarioLibroEntity';
import { ConversacionEntity } from './ConversacionEntity';
import { MensajeEntity } from './MensajeEntity';
import { OpinionLikeEntity } from './OpinionLikeEntity';

@Entity('usuario')
export class UsuarioEntity {
  @PrimaryGeneratedColumn()
  id_usuario!: number;

  @Column({ type: 'varchar', length: 100 })
  nombre!: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 500, unique: true })
  username!: string;

  @Column({ type: 'varchar', length: 255 })
  password!: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  bio?: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  avatar_url?: string;

  @Column({ type: 'int', default: 0 })
  xp!: number;

  @Column({ type: 'int', default: 0 })
  seguidores!: number;

  @Column({ type: 'int', default: 0 })
  seguidos!: number;

  @CreateDateColumn()
  fecha_creacion!: Date;

  @OneToMany(() => OpinionEntity, (opinion) => opinion.usuario)
  opiniones!: OpinionEntity[];

  @OneToMany(() => UsuarioLibroEntity, (usuarioLibro) => usuarioLibro.usuario)
  libros!: UsuarioLibroEntity[];

  @OneToMany(() => OpinionLikeEntity, (like) => like.usuario)
  likes!: OpinionLikeEntity[];

  @OneToMany(() => MensajeEntity, (mensaje) => mensaje.emisor)
  mensajesEnviados!: MensajeEntity[];

  @OneToMany(() => ConversacionEntity, (conv) => conv.usuario1)
  conversacionesIniciadas!: ConversacionEntity[];

  @OneToMany(() => ConversacionEntity, (conv) => conv.usuario2)
  conversacionesRecibidas!: ConversacionEntity[];
}
