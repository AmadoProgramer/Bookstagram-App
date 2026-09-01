import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { ConversacionEntity } from './ConversacionEntity';
import { UsuarioEntity } from './UsuarioEntity';

@Entity('mensaje')
export class MensajeEntity {
  @PrimaryGeneratedColumn()
  id_mensaje!: number;

  @Column({ type: 'int' })
  id_conversacion!: number;

  @Column({ type: 'int' })
  id_usuario_emisor!: number;

  @Column({ type: 'text' })
  texto!: string;

  @CreateDateColumn({ name: 'fecha' })
  fecha!: Date;

  @ManyToOne(() => ConversacionEntity, (conversacion) => conversacion.mensajes, { onDelete: 'CASCADE' })
  conversacion!: ConversacionEntity;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.mensajesEnviados, { onDelete: 'CASCADE' })
  emisor!: UsuarioEntity;
}
