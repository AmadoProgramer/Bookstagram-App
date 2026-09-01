import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { UsuarioEntity } from './UsuarioEntity';
import { LibroEntity } from './LibroEntity';
import { ProgresoLibroEntity } from './ProgresoLibroEntity';

@Entity('usuariolibro')
export class UsuarioLibroEntity {
  @PrimaryGeneratedColumn()
  id_usuario_libro!: number;

  @Column({ type: 'int' })
  id_usuario!: number;

  @Column({ type: 'int' })
  id_libro!: number;

  @Column({ type: 'varchar', length: 50 })
  estado!: string;

  @Column({ type: 'date', nullable: true })
  fecha_inicio?: Date;

  @Column({ type: 'date', nullable: true })
  fecha_fin?: Date;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.libros, { onDelete: 'CASCADE' })
  usuario!: UsuarioEntity;

  @ManyToOne(() => LibroEntity, (libro) => libro.usuarios, { onDelete: 'CASCADE' })
  libro!: LibroEntity;

  @OneToMany(() => ProgresoLibroEntity, (progreso) => progreso.usuarioLibro, { cascade: true })
  progresos!: ProgresoLibroEntity[];
}
