import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import { MensajeEntity } from './MensajeEntity';
import { UsuarioEntity } from './UsuarioEntity';

@Entity('conversacion')
export class ConversacionEntity {
  @PrimaryGeneratedColumn()
  id_conversacion!: number;

  @Column({ type: 'int' })
  id_usuario1!: number;

  @Column({ type: 'int' })
  id_usuario2!: number;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fecha_creacion!: Date;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.conversacionesIniciadas, { onDelete: 'CASCADE' })
  usuario1!: UsuarioEntity;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.conversacionesRecibidas, { onDelete: 'CASCADE' })
  usuario2!: UsuarioEntity;

  @OneToMany(() => MensajeEntity, (mensaje) => mensaje.conversacion, { cascade: true })
  mensajes!: MensajeEntity[];
}
