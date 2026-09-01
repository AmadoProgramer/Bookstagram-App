import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, ManyToOne } from 'typeorm';
import { UsuarioLibroEntity } from './UsuarioLibroEntity';

@Entity('progresolibro')
export class ProgresoLibroEntity {
  @PrimaryGeneratedColumn()
  id_progreso!: number;

  @Column({ type: 'int' })
  id_usuario_libro!: number;

  @Column({ type: 'int' })
  porcentaje!: number;

  @Column({ type: 'int' })
  capitulos_leidos!: number;

  @UpdateDateColumn({ name: 'fecha_actualizacion' })
  fecha_actualizacion!: Date;

  @ManyToOne(() => UsuarioLibroEntity, (usuarioLibro) => usuarioLibro.progresos, { onDelete: 'CASCADE' })
  usuarioLibro!: UsuarioLibroEntity;

  // Estas propiedades se derivarán de usuarioLibro
  get id_usuario(): number {
    return this.usuarioLibro?.id_usuario;
  }

  get id_libro(): number {
    return this.usuarioLibro?.id_libro;
  }
}
